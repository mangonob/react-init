interface EnvironmentValue {
  APP_NAME: string;
}

export function getEnvironment<K extends keyof EnvironmentValue>(
  key: K
): EnvironmentValue[K] | undefined {
  return import.meta.env[key] as EnvironmentValue[K] | undefined;
}
