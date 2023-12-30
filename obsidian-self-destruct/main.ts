import { App, Plugin, PluginSettingTab, Setting, moment } from 'obsidian';

type DeletionInterval = 'Daily' | 'Weekly';

interface SelfDestructSettings {
	deletionInterval: DeletionInterval;
}

export default class SelfDestructPlugin extends Plugin {
	settings: SelfDestructSettings;

	async onload() {
		console.debug("loaded self-destructing-notes");
		await this.loadSettings();

		this.addSettingTab(new SelfDestructSettingsTab(this.app, this));

		this.registerInterval(window.setInterval(() => this.destructNotes(), 5 * 1000));
	}

	async loadSettings() {
		let data = await this.loadData();
		console.debug(data);

		let deletionInterval = 'Weekly';
		if (data && data.deletionInterval) {
			deletionInterval = data.deletionInterval;
		}

		this.settings = {
			deletionInterval: deletionInterval as DeletionInterval,
		};
		console.debug("Current settings", this.settings);
	}

	async saveSettings() {
		console.debug("Current settings", this.settings);
		await this.saveData(this.settings);
	}

	async destructNotes() {
		console.debug("would have been deleting notes");
		// let deletionFolder;
		// try {
		// 	deletionFolder = this.app.vault.getAbstractFileByPath("delete-me");
		// } catch (e) {
		// 	new Notice(e);
		// }
		// if (deletionFolder instanceof TFolder) {
		// 	console.debug("debug folder", deletionFolder);
		// } else {
		// 	console.debug("error: not found");
		// }
	}
}

class SelfDestructSettingsTab extends PluginSettingTab {
	plugin: SelfDestructPlugin;
	needsReload: boolean;

	constructor(app: App, plugin: SelfDestructPlugin) {
		super(app, plugin);
		this.plugin = plugin;
		this.needsReload = false;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Delete interval")
			.setDesc("How often to delete old notes")
			.addDropdown(dp => dp
				.setValue(this.plugin.settings.deletionInterval)
				.onChange(async (value) => {
					this.plugin.settings.deletionInterval = value as DeletionInterval;
					await this.plugin.saveSettings();
				}));
	}

	hide(): void {
		console.debug("Hiding plugin settings");
		this.reloadPluginIfNeeded();
	}

	reloadPluginIfNeeded(): void {
		console.debug("Reloading plugin to re-register interval");
		if (this.needsReload) {
			this.needsReload = false;
			this.plugin.unload();
			this.plugin.load();
		}
	}
}
