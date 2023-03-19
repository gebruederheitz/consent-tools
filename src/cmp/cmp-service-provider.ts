export interface CmpServiceProviderImplementation {
    new(options: object): CmpServiceProvider;
}

export interface CmpServiceProvider {
    acceptService(serviceId: string): void;

    attachSettingsOpener(domSelector: string): void;

    getConsentStatusForService(serviceId: string): Promise<boolean>;

    isPresent(): boolean;

    showSettingsMenu(): void;

    showSettingsMenuAtService(serviceId: string): void;

    /**
     * Attach a continuous listener to any consent updates for the service
     * identified by serviceId. The callback will receive a boolean first
     * argument indicating the updated consent status, as well as your custom
     * args provided on registration.
     */
    onConsentUpdate(
        serviceId: string,
        callback: (status: boolean) => void
    ): Promise<void>;
}
