'use strict';
import * as vscode from 'vscode';
import { AppInsightsClient } from './appInsightsClient';

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('extension.openChatRoom', () => {

        const panel = vscode.window.createWebviewPanel("chatRoom", "Chat Room", vscode.ViewColumn.Two, {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        
        panel.webview.html = `<body style="margin:0px;padding:0px;overflow:hidden">
            <iframe src="https://azure-chat-room.azurewebsites.net/" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe>
        </body>`;

        AppInsightsClient.sendEvent("openChatRoom");
    });

    const chatRoomStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 9999);
    chatRoomStatusBarItem.command = "extension.openChatRoom";
    chatRoomStatusBarItem.text = "$(comment-discussion) Chat";
    chatRoomStatusBarItem.tooltip = "Open Chat Room";
    chatRoomStatusBarItem.show();

    context.subscriptions.push(disposable);
}

export function deactivate() {
}