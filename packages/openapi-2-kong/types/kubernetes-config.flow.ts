import { HttpMethodType } from './openapi3.flow';

export type K8sAnnotations = {
  'kubernetes.io/ingress.class': 'kong';

  [key: string]: string;
};

export type K8sMetadata = {
  name: string;
  annotations: K8sAnnotations;
};

export type K8sBackend = {
  serviceName: string;
  servicePort: number;
};

export type K8sPath = {
  path?: string;
  backend: K8sBackend;
};

export type K8sIngressRule = {
  host: string;
  tls?: { paths: Array<K8sPath>; tls: { secretName: string } };
  http?: { paths: Array<K8sPath> };
};

export type K8sIngressRules = Array<K8sIngressRule>;

export type K8sSpec = {
  rules: K8sIngressRules;
};

export type KubernetesMethodConfig = {
  apiVersion: 'configuration.konghq.com/v1';
  kind: 'KongIngress';
  metadata: {
    name: string;
  };
  route: {
    methods: Array<HttpMethodType>;
  };
};

export type KubernetesPluginConfig = {
  apiVersion: 'configuration.konghq.com/v1';
  kind: 'KongPlugin';
  metadata: {
    name: string;
    global?: boolean;
  };
  config?: {
    [key: string]: any;
  };
  plugin: string;
};

export type KubernetesConfig = {
  apiVersion: 'extensions/v1beta1';
  kind: 'Ingress';
  metadata: K8sMetadata;
  spec: K8sSpec;
};
