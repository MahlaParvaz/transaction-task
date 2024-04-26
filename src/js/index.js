const btn = document.querySelector('.btn');
const searchBar = document.querySelector('.search');
const actionList = document.querySelector('.transaction-list');
const tableBody = document.querySelector('.table__body');
const tableSortPrice = document.querySelector('.table__sort-price');
const chevronPrice = document.querySelector('.chevron_price');
const tableSortDate = document.querySelector('.table__sort-date');
const chevronDate = document.querySelector('.chevron_date');
const searchInput = document.querySelector('.search__input');
const searchIcon = document.querySelector('.search__icon');

const URL = 'http://localhost:3000/transactions';
let actionData = [];

btn.addEventListener('click', loadActionData);
tableSortPrice.addEventListener('click', sortPrice);
tableSortDate.addEventListener('click', sortDate);
searchInput.addEventListener('input', filterData);
searchIcon.addEventListener('click', filterData);

async function loadActionData() {
  btn.classList.add('hidden');
  searchBar.style.display = 'flex';
  actionList.style.display = 'flex';

  try {
    const response = await axios.get(URL);
    actionData = response.data;
    renderActionData(actionData);
  } catch (error) {
    console.error(error);
  }
}

function renderActionData(data) {
  tableBody.innerHTML = '';
  data.forEach((item) => {
    const tableColumn = document.createElement('tr');
    tableColumn.innerHTML = `
        <td>${item.id}</td>
        ${
          item.type === 'افزایش اعتبار'
            ? `<td style='color : #ACD373'>${item.type}</td>`
            : `<td style='color : #FF5252'>${item.type}</td>`
        }
        <td>${new Intl.NumberFormat().format(item.price)}</td>
        <td>${item.refId}</td>
        <td>${new Date(item.date).toLocaleDateString('fa')} ساعت 
        ${new Date(item.date).toLocaleTimeString('fa')}
        </td>
    `;
    tableBody.appendChild(tableColumn);
  });
}

async function sortPrice() {
  chevronPrice.classList.toggle('up');
  const order = chevronPrice.classList.contains('up') ? 'asc' : 'desc';

  try {
    const response = await axios.get(`${URL}?_sort=price&_order=${order}`);
    const sortedData = response.data;
    renderActionData(sortedData);
  } catch (error) {
    console.error(error);
  }
}

async function sortDate() {
  chevronDate.classList.toggle('up');
  const order = chevronDate.classList.contains('up') ? 'asc' : 'desc';

  try {
    const response = await axios.get(`${URL}?_sort=date&_order=${order}`);
    const sortedData = response.data;
    renderActionData(sortedData);
  } catch (error) {
    console.error(error);
  }
}

async function filterData() {
  const searchItem = +searchInput.value.trim();
  if (searchItem) {
    try {
      const response = await axios.get(`${URL}?refId_like=${searchItem}`);
      const filteredData = response.data;
      renderActionData(filteredData);
    } catch (error) {
      console.error(error);
    }
  } else {
    loadActionData();
  }
}
