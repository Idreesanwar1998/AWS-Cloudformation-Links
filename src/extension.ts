import * as vscode from 'vscode';
import { Disposable, Hover, languages } from 'vscode';
import { LinkMappings as LinkService } from './linkservice';

export function activate(context: vscode.ExtensionContext) {
	let linkmappings = new LinkService();
	let disposable: Disposable[] = [];

	disposable.push(languages.registerHoverProvider('yaml', {
		async provideHover(document, position, token) {
			return getLink(document, position, linkmappings);
		}
	}));

	disposable.push(languages.registerHoverProvider('yml', {
		async provideHover(document, position, token) {
			return getLink(document, position, linkmappings);
		}
	}));

	disposable.forEach(provider => {
		context.subscriptions.push(provider);
	});
}
	

// This method is called when your extension is deactivated
export function deactivate() {}

async function getLink(document: vscode.TextDocument, position: vscode.Position, linkmappings: LinkService){
	let lineText = document.lineAt(position.line);
	let link = await linkmappings.getLink(lineText.text);

	if(!link){
		return null;
	}

	return new Hover(new vscode.MarkdownString(link,true));
}