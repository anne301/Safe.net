import { AppConfig } from 'blockstack'
export const appConfig = new AppConfig(['store_write', 'publish_data'])
export const websiteType = {
	PENDING: 'pending',
	BLOCKED: 'blocked'
}