$(function () {
    chrome.storage.sync.get(['total', 'limit'], function (budget) {
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });

    $('#spendAmount').click(function () {
        // First parameter is var 'total'
        // Second parameter is CB function
        chrome.storage.sync.get(['total', 'limit'], function (budget) {
            var newTotal = 0;
            if (budget.total) {
                // If there's already a total declared, replace newTotal with this amount
                newTotal += parseInt(budget.total);
            }

            var amount = $('#amount').val();
            if (amount) {
                // If user entered an amount, add that to newTotal
                newTotal += parseInt(amount);
            }

            // How to put values into key/value variables in extensions
            chrome.storage.sync.set({
                'total': newTotal
            }, function () {
                if (amount && newTotal >= budget.limit) {
                    var notifOptions = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Limit reached!',
                        message: "Uh oh! Looks like you've reached your limit!"
                    };
                    chrome.notifications.create('limitNotif', notifOptions);
                }
            });

            // Set new value into view and clear input amount
            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});