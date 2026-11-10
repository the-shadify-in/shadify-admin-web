interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export class InternalBffClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.INTERNAL_API_BASE_URL || 'http://localhost:8080';
  }

  private async getOidcToken(): Promise<string> {
    // In GCP production, fetches token from Google metadata server:
    // http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=...
    if (process.env.NODE_ENV === 'production') {
      try {
        const metadataUrl = `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${encodeURIComponent(
          process.env.OIDC_TARGET_AUDIENCE || 'https://shadify-api-internal-bff'
        )}`;
        const res = await fetch(metadataUrl, {
          headers: { 'Metadata-Flavor': 'Google' },
        });
        if (res.ok) {
          return await res.text();
        }
      } catch (e) {
        console.error('Failed to fetch GCP OIDC token from metadata server:', e);
      }
    }
    return 'dev-internal-oidc-bearer-token';
  }

  async fetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const token = await this.getOidcToken();
    const url = new URL(path, this.baseUrl);

    if (options.params) {
      Object.entries(options.params).forEach(([key, val]) => {
        url.searchParams.append(key, val);
      });
    }

    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Content-Type', 'application/json');

    const res = await fetch(url.toString(), {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Internal BFF request failed [${res.status}]: ${errorText}`);
    }

    return (await res.json()) as T;
  }

  async triggerMaintenanceCleanup(): Promise<{ status: string; cleanedCount: number }> {
    return this.fetch('/internal-bff/maintenance/clean-expired-sessions', {
      method: 'POST',
    });
  }

  async replayDlqEvent(dlqId: string, operatorUserId: string, operatorSecretHex: string) {
    return this.fetch('/internal-bff/dlq/replay', {
      method: 'POST',
      body: JSON.stringify({
        dlqId,
        operatorUserId,
        operatorSecretHex,
      }),
    });
  }
}

export const bffClient = new InternalBffClient();

