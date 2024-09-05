declare global {
    interface Window {
        $utils: {
            getUuid: () => string
            formatDate: (date: any, fmt: string) => string
        }
    }
}
