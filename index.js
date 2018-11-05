const Tailor = require('node-tailor')
const { initTracer, PrometheusMetricsFactory, ProbabilisticSampler } = require('jaeger-client')
const promClient = require('prom-client')
const bunyan = require('bunyan')
const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing')


const serviceName = 'tailor'
const tracingAddress = 'jaeger.gp.local'

const tracer = 	initTracer(
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

module.exports = () => {
  return new Tailor({
    tracer
  })
}
