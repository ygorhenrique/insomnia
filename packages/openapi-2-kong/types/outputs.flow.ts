import { DeclarativeConfig } from './declarative-config.flow';
import {
  KubernetesConfig,
  KubernetesMethodConfig,
  KubernetesPluginConfig,
} from './kubernetes-config.flow';

export type ConversionResultType = 'kong-declarative-config' | 'kong-for-kubernetes';

export type DeclarativeConfigResult = {
  type: 'kong-declarative-config';
  label: string;
  documents: Array<DeclarativeConfig>;
  warnings: Array<{
    severity: number;
    message: string;
    range: {};
  }>;
};

export type KongForKubernetesResult = {
  type: 'kong-for-kubernetes';
  label: string;
  documents: Array<KubernetesConfig | KubernetesPluginConfig | KubernetesMethodConfig>;
  warnings: Array<{
    severity: number;
    message: string;
    range: {};
  }>;
};

export type ConversionResult = DeclarativeConfigResult | KongForKubernetesResult;
