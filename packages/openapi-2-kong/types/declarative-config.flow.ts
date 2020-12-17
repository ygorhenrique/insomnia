/* eslint-disable camelcase */
export type DCPlugin = {
  name: string;
  enabled?: boolean;
  config?: {
    [key: string]: Object;
  };
};

export type DCRoute = {
  methods: Array<string>;
  strip_path: boolean;
  tags: Array<string>;
  name: string;
  paths: Array<string>;
  plugins?: Array<DCPlugin>;
};

export type DCService = {
  url: string;
  name: string;
  routes: Array<DCRoute>;
  tags: Array<string>;
  plugins?: Array<DCPlugin>;
};

export type DCTarget = {
  target: string;
};

export type DCUpstream = {
  name: string;
  tags: Array<string>;
  targets: Array<DCTarget>;
};

export type DeclarativeConfig = {
  _format_version: '1.1';
  services: Array<DCService>;
  upstreams: Array<DCUpstream>;
};
