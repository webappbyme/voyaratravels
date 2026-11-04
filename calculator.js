/* ============ VOYARA TRAVELS — CALCULATOR.JS ============ */

document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('calcForm');
  if (!form) return;

  const destinationEl = document.getElementById('destination');
  const travellersEl = document.getElementById('travellers');
  const daysEl = document.getElementById('days');
  const styleEl = document.getElementById('style');
  const resultBox = document.getElementById('calcResult');
  const resetBtn = document.getElementById('resetCalc');

  const styleLabels = {
    budget: 'Budget Travel Package',
    standard: 'Standard Travel Package',
    luxury: 'Luxury Travel Package'
  };

  const styleMultipliers = {
    budget: 0.8,
    standard: 1.0,
    luxury: 1.6
  };

  /* Clear error messages */
  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    resultBox.innerHTML = '<p>Your estimated cost will appear here.</p>';
    resultBox.style.borderLeftColor = 'var(--rose)';
  }

  /* Show result in result box */
  function showResult(html) {
    resultBox.innerHTML = html;
    resultBox.style.borderLeftColor = 'var(--coral)';
    resultBox.style.transform = 'scale(1.02)';
    setTimeout(() => { resultBox.style.transform = 'scale(1)'; }, 250);
  }

  /* Validation */
  function validate() {
    let valid = true;
    clearErrors();

    const destValue = destinationEl.value;
    const travellers = parseInt(travellersEl.value, 10);
    const days = parseInt(daysEl.value, 10);
    const style = styleEl.value;

    if (!destValue) {
      document.getElementById('errDestination').textContent = 'Please select a destination.';
      valid = false;
    }
    if (isNaN(travellers) || travellers < 1 || travellers > 20) {
      document.getElementById('errTravellers').textContent = 'Enter between 1 and 20 travellers.';
      valid = false;
    }
    if (isNaN(days) || days < 1 || days > 60) {
      document.getElementById('errDays').textContent = 'Enter between 1 and 60 days.';
      valid = false;
    }

    return valid;
  }

  /* Calculate */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validate()) return;

    const selectedOption = destinationEl.options[destinationEl.selectedIndex];
    const destinationName = selectedOption.textContent;
    const baseRate = parseFloat(selectedOption.dataset.rate);
    const travellers = parseInt(travellersEl.value, 10);
    const days = parseInt(daysEl.value, 10);
    const style = styleEl.value;
    const multiplier = styleMultipliers[style];

    const total = Math.round(baseRate * travellers * days * multiplier);
    const formattedTotal = total.toLocaleString('en-US');

    showResult(`
      <p class="result-title">Estimated Cost</p>
      <p class="result-price">$${formattedTotal}</p>
      <p class="result-detail">
        Estimated cost for <strong>${travellers}</strong> traveller${travellers > 1 ? 's' : ''} 
        to <strong>${destinationName}</strong> for <strong>${days}</strong> days:
        <strong>$${formattedTotal}</strong> — ${styleLabels[style]}.
      </p>
      <p class="result-detail" style="margin-top:8px; font-size:0.8rem; color:var(--text-muted);">
        Based on a base rate of $${baseRate} / person / day × ${travellers} travellers × ${days} days × ${multiplier} (${style} multiplier).
      </p>
    `);
  });

  /* Reset */
  resetBtn.addEventListener('click', function () {
    form.reset();
    clearErrors();
    travellersEl.value = 2;
    daysEl.value = 5;
    styleEl.value = 'standard';
  });

});