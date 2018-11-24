"use strict";
import appInsights = require("applicationinsights");
import * as vscode from "vscode";

export class AppInsightsClient {
    public static sendEvent(eventName: string, properties?: { [key: string]: string; }): void {
        if (this._enableTelemetry) {
            this._client.trackEvent({ name: eventName, properties });
        }
    }

    private static _client = new appInsights.TelemetryClient("26ce3bc8-509f-4413-bf4f-a593a41f9d9f");
    private static _enableTelemetry = vscode.workspace.getConfiguration("telemetry").get<boolean>("enableTelemetry");
}
