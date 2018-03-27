# NOTES / README
Uses chrome storage api

Goes over: 
* options page (`"options_page": "options.html",`)
* notifications (`chrome.notifications.create('limitNotif', notifOptions);`)
* background v/s event pages
* context menus
* badges 

## badges code snippet
```
chrome.storage.onChanged.addListener(function (changes, storageName) {
    chrome.browserAction.setBadgeText({
        "text": changes.total.newValue.toString()
    });
});
```

## context menus
```
chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
        if (isInt(clickData.selectionText)) {
            chrome.storage.sync.get(['total', 'limit'], function (budget) {
                var newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({
                    'total': newTotal
                }, function () {
                    if (newTotal >= budget.limit) {
                        var notifOptions = {
                            type: 'basic',
                            iconUrl: 'icon48.png',
                            title: 'Limit reached!',
                            message: "Uh oh! Looks like you've reached your limit!"
                        };
                    };
                    chrome.notifications.create('limitNotif', notifOptions);
                });
            });
        }
    }
});
```