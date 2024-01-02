import { App, Plugin, PluginSettingTab, Setting, TFile, TFolder, moment } from 'obsidian';
import { GCItem, GarbageCollector, noopLogDeleter } from 'gc';

const CHECK_INTERVAL = 5 * 1000;

type DeletionInterval = 'Daily' | 'Weekly';

interface SelfDestructSettings {
	deletionInterval: DeletionInterval;
}

export default class SelfDestructPlugin extends Plugin {
	settings: SelfDestructSettings;
	garbageCollector: GarbageCollector;

	async onload() {
		console.debug("loaded self-destructing-notes");
		await this.loadSettings();

		this.garbageCollector = new GarbageCollector({ deleter: noopLogDeleter });

		this.addSettingTab(new SelfDestructSettingsTab(this.app, this));

		this.registerInterval(window.setInterval(() => this.markNotes(), CHECK_INTERVAL));
		this.registerInterval(window.setInterval(() => this.sweepNotes(), CHECK_INTERVAL));
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

	async markNotes() {
		const folder = this.app.vault.getAbstractFileByPath("delete-me") as TFolder;
		const gcItems: GCItem[] = [];
		folder.children.forEach(note => {
			if (note instanceof TFile) {
				gcItems.push({
					deleteAfter: moment(),
					path: note.path,
				})
			}
		})
		await this.garbageCollector.mark(gcItems);
	}

	async sweepNotes() {
		await this.garbageCollector.sweep();
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
	}
}
