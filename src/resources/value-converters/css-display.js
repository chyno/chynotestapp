export class CssdisplayValueConverter {
    toView(value) {
        return value ? 'none' : 'display';
    }
}