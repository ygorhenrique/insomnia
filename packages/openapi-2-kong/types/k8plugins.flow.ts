import { HttpMethodType, OA3Server } from './openapi3.flow';
import { KubernetesPluginConfig } from './kubernetes-config.flow';

export type OperationPlugins = Array<{
  method: HttpMethodType | null | undefined;
  plugins: Array<KubernetesPluginConfig>;
}>;

export type PathPlugins = Array<{
  path: string;
  plugins: Array<KubernetesPluginConfig>;
  operations: OperationPlugins;
}>;

export type ServerPlugins = Array<{
  server: OA3Server;
  plugins: Array<KubernetesPluginConfig>;
}>;

export type Plugins = {
  global: Array<KubernetesPluginConfig>;
  servers: ServerPlugins;
  paths: PathPlugins;
};

export type IndexIncrement = () => number;
