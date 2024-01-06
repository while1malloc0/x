export namespace mastodon {
	
	export class AccountSource {
	    privacy?: string;
	    sensitive?: boolean;
	    language?: string;
	    note?: string;
	    fields?: Field[];
	
	    static createFrom(source: any = {}) {
	        return new AccountSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.privacy = source["privacy"];
	        this.sensitive = source["sensitive"];
	        this.language = source["language"];
	        this.note = source["note"];
	        this.fields = this.convertValues(source["fields"], Field);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Field {
	    name: string;
	    value: string;
	    // Go type: time
	    verified_at: any;
	
	    static createFrom(source: any = {}) {
	        return new Field(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.value = source["value"];
	        this.verified_at = this.convertValues(source["verified_at"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Emoji {
	    shortcode: string;
	    static_url: string;
	    url: string;
	    visible_in_picker: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Emoji(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.shortcode = source["shortcode"];
	        this.static_url = source["static_url"];
	        this.url = source["url"];
	        this.visible_in_picker = source["visible_in_picker"];
	    }
	}
	export class Account {
	    id: string;
	    username: string;
	    acct: string;
	    display_name: string;
	    locked: boolean;
	    // Go type: time
	    created_at: any;
	    followers_count: number;
	    following_count: number;
	    statuses_count: number;
	    note: string;
	    url: string;
	    avatar: string;
	    avatar_static: string;
	    header: string;
	    header_static: string;
	    emojis: Emoji[];
	    moved?: Account;
	    fields: Field[];
	    bot: boolean;
	    discoverable: boolean;
	    source?: AccountSource;
	
	    static createFrom(source: any = {}) {
	        return new Account(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.username = source["username"];
	        this.acct = source["acct"];
	        this.display_name = source["display_name"];
	        this.locked = source["locked"];
	        this.created_at = this.convertValues(source["created_at"], null);
	        this.followers_count = source["followers_count"];
	        this.following_count = source["following_count"];
	        this.statuses_count = source["statuses_count"];
	        this.note = source["note"];
	        this.url = source["url"];
	        this.avatar = source["avatar"];
	        this.avatar_static = source["avatar_static"];
	        this.header = source["header"];
	        this.header_static = source["header_static"];
	        this.emojis = this.convertValues(source["emojis"], Emoji);
	        this.moved = this.convertValues(source["moved"], Account);
	        this.fields = this.convertValues(source["fields"], Field);
	        this.bot = source["bot"];
	        this.discoverable = source["discoverable"];
	        this.source = this.convertValues(source["source"], AccountSource);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class Application {
	    id: string;
	    redirect_uri: string;
	    client_id: string;
	    client_secret: string;
	    auth_uri?: string;
	
	    static createFrom(source: any = {}) {
	        return new Application(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.redirect_uri = source["redirect_uri"];
	        this.client_id = source["client_id"];
	        this.client_secret = source["client_secret"];
	        this.auth_uri = source["auth_uri"];
	    }
	}
	export class AttachmentSize {
	    width: number;
	    height: number;
	    size: string;
	    aspect: number;
	
	    static createFrom(source: any = {}) {
	        return new AttachmentSize(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.width = source["width"];
	        this.height = source["height"];
	        this.size = source["size"];
	        this.aspect = source["aspect"];
	    }
	}
	export class AttachmentMeta {
	    original: AttachmentSize;
	    small: AttachmentSize;
	
	    static createFrom(source: any = {}) {
	        return new AttachmentMeta(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.original = this.convertValues(source["original"], AttachmentSize);
	        this.small = this.convertValues(source["small"], AttachmentSize);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Attachment {
	    id: string;
	    type: string;
	    url: string;
	    remote_url: string;
	    preview_url: string;
	    text_url: string;
	    description: string;
	    meta: AttachmentMeta;
	
	    static createFrom(source: any = {}) {
	        return new Attachment(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.type = source["type"];
	        this.url = source["url"];
	        this.remote_url = source["remote_url"];
	        this.preview_url = source["preview_url"];
	        this.text_url = source["text_url"];
	        this.description = source["description"];
	        this.meta = this.convertValues(source["meta"], AttachmentMeta);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	export class Card {
	    url: string;
	    title: string;
	    description: string;
	    image: string;
	    type: string;
	    author_name: string;
	    author_url: string;
	    provider_name: string;
	    provider_url: string;
	    html: string;
	    width: number;
	    height: number;
	
	    static createFrom(source: any = {}) {
	        return new Card(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	        this.title = source["title"];
	        this.description = source["description"];
	        this.image = source["image"];
	        this.type = source["type"];
	        this.author_name = source["author_name"];
	        this.author_url = source["author_url"];
	        this.provider_name = source["provider_name"];
	        this.provider_url = source["provider_url"];
	        this.html = source["html"];
	        this.width = source["width"];
	        this.height = source["height"];
	    }
	}
	
	
	export class History {
	    day: string;
	    uses: string;
	    accounts: string;
	
	    static createFrom(source: any = {}) {
	        return new History(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.day = source["day"];
	        this.uses = source["uses"];
	        this.accounts = source["accounts"];
	    }
	}
	export class Mention {
	    url: string;
	    username: string;
	    acct: string;
	    id: string;
	
	    static createFrom(source: any = {}) {
	        return new Mention(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	        this.username = source["username"];
	        this.acct = source["acct"];
	        this.id = source["id"];
	    }
	}
	export class PollOption {
	    title: string;
	    votes_count: number;
	
	    static createFrom(source: any = {}) {
	        return new PollOption(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.votes_count = source["votes_count"];
	    }
	}
	export class Poll {
	    id: string;
	    // Go type: time
	    expires_at: any;
	    expired: boolean;
	    multiple: boolean;
	    votes_count: number;
	    voters_count: number;
	    options: PollOption[];
	    voted: boolean;
	    own_votes: number[];
	    emojis: Emoji[];
	
	    static createFrom(source: any = {}) {
	        return new Poll(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.expires_at = this.convertValues(source["expires_at"], null);
	        this.expired = source["expired"];
	        this.multiple = source["multiple"];
	        this.votes_count = source["votes_count"];
	        this.voters_count = source["voters_count"];
	        this.options = this.convertValues(source["options"], PollOption);
	        this.voted = source["voted"];
	        this.own_votes = source["own_votes"];
	        this.emojis = this.convertValues(source["emojis"], Emoji);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class Tag {
	    name: string;
	    url: string;
	    history: History[];
	
	    static createFrom(source: any = {}) {
	        return new Tag(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.url = source["url"];
	        this.history = this.convertValues(source["history"], History);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Status {
	    id: string;
	    uri: string;
	    url: string;
	    account: Account;
	    in_reply_to_id: any;
	    in_reply_to_account_id: any;
	    reblog?: Status;
	    content: string;
	    // Go type: time
	    created_at: any;
	    emojis: Emoji[];
	    replies_count: number;
	    reblogs_count: number;
	    favourites_count: number;
	    reblogged: any;
	    favourited: any;
	    bookmarked: any;
	    muted: any;
	    sensitive: boolean;
	    spoiler_text: string;
	    visibility: string;
	    media_attachments: Attachment[];
	    mentions: Mention[];
	    tags: Tag[];
	    card?: Card;
	    poll?: Poll;
	    application: Application;
	    language: string;
	    pinned: any;
	
	    static createFrom(source: any = {}) {
	        return new Status(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.uri = source["uri"];
	        this.url = source["url"];
	        this.account = this.convertValues(source["account"], Account);
	        this.in_reply_to_id = source["in_reply_to_id"];
	        this.in_reply_to_account_id = source["in_reply_to_account_id"];
	        this.reblog = this.convertValues(source["reblog"], Status);
	        this.content = source["content"];
	        this.created_at = this.convertValues(source["created_at"], null);
	        this.emojis = this.convertValues(source["emojis"], Emoji);
	        this.replies_count = source["replies_count"];
	        this.reblogs_count = source["reblogs_count"];
	        this.favourites_count = source["favourites_count"];
	        this.reblogged = source["reblogged"];
	        this.favourited = source["favourited"];
	        this.bookmarked = source["bookmarked"];
	        this.muted = source["muted"];
	        this.sensitive = source["sensitive"];
	        this.spoiler_text = source["spoiler_text"];
	        this.visibility = source["visibility"];
	        this.media_attachments = this.convertValues(source["media_attachments"], Attachment);
	        this.mentions = this.convertValues(source["mentions"], Mention);
	        this.tags = this.convertValues(source["tags"], Tag);
	        this.card = this.convertValues(source["card"], Card);
	        this.poll = this.convertValues(source["poll"], Poll);
	        this.application = this.convertValues(source["application"], Application);
	        this.language = source["language"];
	        this.pinned = source["pinned"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

