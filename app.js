/*
 *
 * @author Siim Sepp <siim.sepp@gmail.com>
 *
 */

const desc =
    'Calculates the position size in dollars based on the risk you are willing to take on that single trade (percentage of your entire portfolio you are willing to lose), portfolio size (in dollars), stock price now and the stop-loss price (when you will liquidate your position, your maximum loss). Stop-loss price can be both higher and lower than the stock price (hence the calculator can also be used when taking a short position).';
document.getElementById('description').innerHTML = `<p>${desc}</p>`;

document.querySelector('#submit').addEventListener('click', buttonClicked);
document.querySelector('#clear-fields').addEventListener('click', clearFields);

function buttonClicked() {
    const risk = document.getElementById('risk');
    const portfolio = document.getElementById('portfolio');
    const price = document.getElementById('price');
    const stop = document.getElementById('stop');

    const riskAmt = parseFloat(risk.value);
    const portfolioAmt = parseFloat(portfolio.value);
    const priceAmt = parseFloat(price.value);
    const stopAmt = parseFloat(stop.value);
    console.log(riskAmt);
    console.log(portfolioAmt);
    console.log(priceAmt);
    console.log(stopAmt);

    const maxLoss = (portfolioAmt * riskAmt) / 100;
    const stocks = maxLoss / Math.abs(stopAmt - priceAmt);
    const posiSize = stocks * priceAmt;
    const posiSizeStocks = posiSize / priceAmt;

    if (isFinite(posiSize)) {
        document.getElementById('results').style.display = 'block';
        document.getElementById('clear-fields').style.visibility = 'visible';
        document.getElementById(
            'result-number'
        ).innerHTML = `Position size: <span id="dollar-amount">${posiSize.toFixed(
            1
        )}</span> dollars which equals <span id="stock-amount">${posiSizeStocks.toFixed(2)}</span> stocks.`;
    } else {
        showError('Please check your numbers');
    }
}

function showError(msg) {
    document.getElementById('results').style.display = 'none';

    const errorDiv = document.createElement('div');

    const cardContent = document.querySelector('.card-content');
    const cardTitle = document.querySelector('.card-title');
    errorDiv.className = 'alert alert-danger';

    errorDiv.appendChild(document.createTextNode(msg));

    // cardContent on parent ja cardTitle child. errorDiv läheb nende vahele.
    cardContent.insertBefore(errorDiv, cardTitle);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}

function clearFields(e) {
    document.getElementById('results').style.display = 'none';

    document.getElementById('risk').value = '';
    document.getElementById('portfolio').value = '';
    document.getElementById('price').value = '';
    document.getElementById('stop').value = '';

    e.target.style.visibility = 'hidden';
}
