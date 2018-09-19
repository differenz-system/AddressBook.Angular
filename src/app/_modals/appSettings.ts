export class AppSettings {

    // Local URL
    public static LocalURL = "http://localhost:8181/laravel-angular/public/";
    // DIFFERENZ UAT URL
    public static UATURL = "http://127.0.0.1:8000/laravel-angular/public/";

    // PRODUCTION  URL
    public static ProductionURL = "";
    public static IsLocal = true;
    public static IsDevelopment = false;
    public static IsProduction = false;

    public static ApiURL = AppSettings.SetAPIURL();
    public static RegisterUser = AppSettings.ApiURL + 'RegisterUser';
    public static ValidateLogin = AppSettings.ApiURL + 'login';
    public static AddAddressBook = AppSettings.ApiURL + 'AddAddressBook';
    public static GetAddressBookList = AppSettings.ApiURL + 'GetAddressBookList';
    public static GetAddressBookById = AppSettings.ApiURL + 'GetAddressBookById';
    public static DeleteAddressBookById = AppSettings.ApiURL + 'DeleteAddressBookById';
    
    public static SetAPIURL() {

        if (AppSettings.IsLocal) {
            return AppSettings.LocalURL;
        }
        else if (AppSettings.IsDevelopment) {
            return AppSettings.UATURL;
        }
        else if (AppSettings.IsProduction) {
            return AppSettings.ProductionURL;
        }
    }
    // End System Admin
} 
