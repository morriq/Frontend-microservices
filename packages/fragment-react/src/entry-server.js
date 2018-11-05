import axios from 'axios'
import React from 'react'

import createApp from './index.js'
const { initTracer, PrometheusMetricsFactory, ProbabilisticSampler } = require('jaeger-client')
const promClient = require('prom-client')
const bunyan = require('bunyan')
const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing')

const tracingAddress = 'jaeger.gp.local'
const serviceName = 'frontend:microservices:' + process.env.npm_package_config_port

const tracer = initTracer(
  {
    serviceName,
    reporter: {
      agentHost: tracingAddress
    }
  },
  {
    host: tracingAddress,
    sampler: new ProbabilisticSampler(1),
    metrics: new PrometheusMetricsFactory(promClient, serviceName),
    logger: bunyan.createLogger({
      name: serviceName
    })
  });

export default (request) => {
  const parentSpanContext = tracer.extract(
    FORMAT_HTTP_HEADERS,
    request.headers
  )
  const spanOptions = parentSpanContext ? { childOf: parentSpanContext } : {}

  const span = tracer.startSpan('api_call', spanOptions)

	return axios.get('https://applications-tracker-beta.pracuj.pl/user-applications/fake?limit=500')
		.catch(() => {
      span.log({'event': 'request_end'});
      span.finish();

      return {
        data: {
          Applications: []
        }
      };
		})
		.then(({ data }) => data.Applications)
		.then((state) => {
      span.log({'event': 'request_end'});
      span.finish();

			const markup = (
				<div id="contacts">
					<style>
						{ `.recommendation {
							width: 250px;
							padding: 10px;
							margin: 10px;
							box-shadow: 0 0 10px black;
							display: inline-block;
							}
						`}
					</style>
					{createApp(state)}
				</div>
			);
			return {
				state,
				markup
			};
		});
};
