import { App, Plugin, PluginSettingTab, Setting, TFile, TFolder, FileManager } from 'obsidian';
import { GCItem, GarbageCollector, noopLogDeleter } from 'gc';

const moment = require('moment');

const CHECK_INTERVAL = 5 * 1000;

interface SelfDestructSettings {
  defaultTTL: moment.Duration;
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

    let defaultTTL: moment.Duration = moment.duration(1, "week");
    if (data && data.defaultTTL) {
      defaultTTL = moment.duration(data.defaultTTL);
    }

    this.settings = {
      defaultTTL: defaultTTL,
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
    for (let note of folder.children) {
      if (note instanceof TFile) {
        const createdAt: moment.Moment = moment(note.stat.ctime);
        let deleteAfter = createdAt.clone().add(this.settings.defaultTTL);
        await this.app.fileManager.processFrontMatter(note, (fm) => {
          if (fm["delete-after"]) {
            const [duration, unit] = fm["delete-after"].split(" ");
            const ttl = moment.duration(duration, unit);
            deleteAfter = createdAt.clone().add(ttl);
          }
        })
        gcItems.push({
          deleteAfter: deleteAfter,
          path: note.path,
        })
        await this.garbageCollector.mark(gcItems);
      }
    }
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

    let ttlVal = moment.duration().humanize();
    if (this.plugin.settings && this.plugin.settings.defaultTTL) {
      ttlVal = this.plugin.settings.defaultTTL.humanize();
    }

    new Setting(containerEl)
      .setName("Delete interval")
      .setDesc("How often to delete old notes")
      .addText(dp => dp
        .setValue(ttlVal)
        .onChange(async (value) => {
          // TODO: error handle
          const [duration, unit] = value.split(" ");
          const defaultTTL = moment.duration(duration, unit);
          this.plugin.settings.defaultTTL = defaultTTL;
          await this.plugin.saveSettings();
        }));
  }

  hide(): void {
    console.debug("Hiding plugin settings");
  }
}
