import { $Values } from 'utility-types';

export type OA3Info = {
  title: string;
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: {
    name?: string;
    url?: string;
    email?: string;
  };
  license?: {
    name: string;
    url?: string;
  };
  'x-kubernetes-ingress-metadata'?: {
    name?: string;
    annotations?: Object;
  };
};

export type OA3ExternalDocs = {
  url: string;
  description?: string;
};

export type OA3Parameter = {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
};

export type OA3RequestBody = {};

export type OA3SecurityRequirement = {};

export type OA3Operation = {
  description?: string;
  summary?: string;
  tags?: Array<string>;
  externalDocs?: OA3ExternalDocs;
  operationId?: string;
  parameters?: Array<OA3Parameter | OA3Reference>;
  requestBody?: OA3RequestBody | OA3Reference;
  deprecated?: boolean;
  security?: Array<OA3SecurityRequirement>;
  servers?: Array<OA3Server>;
};

export type OA3Reference = {
  $ref: string;
};

export type OA3Server = {
  url: string;
  description?: string;
  variables?: OA3Variables;
} & OA3ServerKubernetesProperties;

// Improving typing of this
export type OA3ServerKubernetesProperties = {
  'x-kubernetes-backend'?: {
    serviceName: string;
    servicePort: number;
  };
  'x-kubernetes-service'?: {
    spec?: {
      ports?: Array<{
        port: number;
      }>;
    };
    metadata?: {
      name: string;
    };
  };
  'x-kubernetes-tls'?: Object;
};

export type OA3Variables = {
  [key: string]: {
    default: string;
    enum?: Array<string>;
    description?: string;
  };
};

export type OA3PathItem = {
  $ref?: string;
  summary?: string;
  description?: string;
  servers?: Array<OA3Server>;
  parameters?: OA3Reference | OA3Parameter;
  get?: OA3Operation;
  put?: OA3Operation;
  post?: OA3Operation;
  delete?: OA3Operation;
  options?: OA3Operation;
  head?: OA3Operation;
  patch?: OA3Operation;
  trace?: OA3Operation;
};

export type OA3Paths = {
  [key: string]: OA3PathItem;
};

export type OA3SecuritySchemeApiKey = {
  type: 'apiKey';
  name: string;
  in: 'query' | 'header' | 'cookie';
  description?: string;
};

export type OA3SecuritySchemeHttp = {
  type: 'http';
  name: string;
  scheme: string;
  bearerFormat?: string;
  description?: string;
};

export type OA3SecuritySchemeOpenIdConnect = {
  type: 'openIdConnect';
  name: string;
  openIdConnectUrl: string;
  description?: string;
};

export type OA3SecuritySchemeOAuth2Flow = {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: {
    [key: string]: string;
  };
};

export type OA3SecuritySchemeOAuth2 = {
  type: 'oauth2';
  name: string;
  flows: {
    implicit: OA3SecuritySchemeOAuth2Flow;
    password: OA3SecuritySchemeOAuth2Flow;
    clientCredentials: OA3SecuritySchemeOAuth2Flow;
    authorizationCode: OA3SecuritySchemeOAuth2Flow;
  };
  description?: string;
};

export type OA3SecurityScheme =
  | OA3SecuritySchemeApiKey
  | OA3SecuritySchemeHttp
  | OA3SecuritySchemeOpenIdConnect
  | OA3SecuritySchemeOAuth2;

export type OA3Example = {};

export type OA3Schema = {};

export type OA3Header = {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
};

export type OA3Components = {
  schemas?: {
    [key: string]: OA3Schema | OA3Reference;
  };
  parameters?: {
    [key: string]: OA3Parameter | OA3Reference;
  };
  headers?: {
    [key: string]: OA3Header | OA3Reference;
  };
  requestBodies?: {
    [key: string]: OA3RequestBody | OA3Reference;
  };
  examples?: {
    [key: string]: OA3Example | OA3Reference;
  };
  securitySchemes?: {
    [key: string]: OA3SecurityScheme | OA3Reference;
  };
};

export type OpenApi3Spec = {
  openapi: string;
  info: OA3Info;
  paths: OA3Paths;
  servers?: Array<OA3Server>;
  components?: OA3Components;
  security?: Array<OA3SecurityRequirement>;
  tags?: Array<string>;
  externalDocs?: OA3ExternalDocs;
  'x-kong-name'?: string;
};

const HttpMethod = {
  get: 'GET',
  put: 'PUT',
  post: 'POST',
  delete: 'DELETE',
  options: 'OPTIONS',
  head: 'HEAD',
  patch: 'PATCH',
  trace: 'TRACE',
};

export type HttpMethodType = $Values<typeof HttpMethod>;
