import { OA3Operation, OA3Server } from '../../types/openapi3.flow';
import { getPluginNameFromKey, isPluginKey } from '../common';
import { DCPlugin } from '../../types/declarative-config.flow';

export function isRequestValidatorPluginKey(key: string): boolean {
  return key.match(/-request-validator$/) != null;
}

type GeneratorFn = (key: string, value: Object, iterable: Object | Array<Object>) => DCPlugin;

export function generatePlugins(item: Object, generator: GeneratorFn): Array<DCPlugin> {
  const plugins: Array<DCPlugin> = [];

  for (const key of Object.keys(item)) {
    if (!isPluginKey(key)) {
      continue;
    }

    plugins.push(generator(key, item[key], item));
  }

  return plugins;
}

export function generatePlugin(key: string, value: Object): DCPlugin {
  const plugin: DCPlugin = {
    name: (value as any).name || getPluginNameFromKey(key),
  };

  if ((value as any).config) {
    plugin.config = (value as any).config;
  }

  return plugin;
}

export function generateRequestValidatorPlugin(obj: Object, operation: OA3Operation): DCPlugin {
  const config: {
    [key: string]: Object;
  } = {
    version: 'draft4', // Fixed version
  };

  config.parameter_schema = [];

  if (operation.parameters) {
    for (const p of operation.parameters) {
      if (!(p as any).schema) {
        throw new Error("Parameter using 'content' type validation is not supported");
      }
      (config.parameter_schema as any).push({
        in: (p as any).in,
        explode: !!(p as any).explode,
        required: !!(p as any).required,
        name: (p as any).name,
        schema: JSON.stringify((p as any).schema),
        style: 'simple',
      });
    }
  }

  if (operation.requestBody) {
    const content = (operation.requestBody as any).content;
    if (!content) {
      throw new Error('content property is missing for request-validator!');
    }

    let bodySchema;
    for (const mediatype of Object.keys(content)) {
      if (mediatype !== 'application/json') {
        throw new Error(`Body validation supports only 'application/json', not ${mediatype}`);
      }
      const item = content[mediatype];
      bodySchema = JSON.stringify(item.schema);
    }

    if (bodySchema) {
      config.body_schema = bodySchema;
    }
  }

  return {
    config,
    enabled: true,
    name: 'request-validator',
  };
}

export function generateServerPlugins(server: OA3Server): Array<DCPlugin> {
  const plugins: Array<DCPlugin> = [];

  for (const key of Object.keys(server)) {
    if (!isPluginKey(key)) {
      continue;
    }

    plugins.push(generatePlugin(key, server[key]));
  }

  return plugins;
}

export function generateOperationPlugins(operation: OA3Operation): Array<DCPlugin> {
  const plugins: Array<DCPlugin> = [];

  for (const key of Object.keys(operation)) {
    if (!isPluginKey(key)) {
      continue;
    }

    if (isRequestValidatorPluginKey(key)) {
      plugins.push(generateRequestValidatorPlugin(operation[key], operation));
    } else {
      plugins.push(generatePlugin(key, operation[key]));
    }
  }

  return plugins;
}
