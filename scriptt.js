document.addEventListener('DOMContentLoaded', () => {
  fetch('https://restcountries.com/v3.1/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const tbody = document.getElementById('countryTable');
      tbody.innerHTML = '';

      // Sort countries alphabetically by name
      data.sort((a, b) => {
        const nameA = a.name?.common || '';
        const nameB = b.name?.common || '';
        return nameA.localeCompare(nameB);
      });

      data.forEach(country => {
        const row = document.createElement('tr');
        const countryName = country.name?.common || 'Unknown';

        const currencies = country.currencies;
        let currencyNames = [];

        if (currencies && typeof currencies === 'object') {
          for (const key in currencies) {
            if (currencies[key]?.name) {
              currencyNames.push(currencies[key].name);
            }
          }
        }

        if (currencyNames.length === 0) {
          currencyNames.push('N/A');
        }

        row.innerHTML = `
          <td>${countryName}</td>
          <td>${currencyNames.join(', ')}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      document.getElementById('countryTable').innerHTML = '<tr><td colspan="2">Failed to load data.</td></tr>';
    });
});
