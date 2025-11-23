// FINAL VERSION — Auto-sort top users by sales + search + chart + works locally

// ---------------- SAMPLE DATA ----------------
const data = {
    stats: {
        totalUsers: 320,
        totalSales: 452000,
        orders: 980
    },
    users: [
        { name: "Aishwarya", role: "Admin", sales: 25000 },
        { name: "Mahesh", role: "Editor", sales: 18000 },
        { name: "Sana", role: "Contributor", sales: 12000 },
        { name: "Raju", role: "Support", sales: 8000 },
        { name: "Deepak", role: "Manager", sales: 30000 },
        { name: "Kavya", role: "HR", sales: 5000 },
        { name: "Harsha", role: "Team Lead", sales: 32000 },
        { name: "Nikhil", role: "Sales", sales: 21000 },
        { name: "Priya", role: "Marketing", sales: 17000 },
        { name: "Shravya", role: "Finance", sales: 26000 },
        { name: "Vikram", role: "Developer", sales: 15000 }
    ]
};


// ---------------- SORT USERS BY SALES (DESC) ----------------
data.users.sort((a, b) => b.sales - a.sales);
// Highest sales → lowest sales


// --------------- FILL DASHBOARD CARDS ---------------
if (document.getElementById("totalUsers"))
    document.getElementById("totalUsers").textContent = data.stats.totalUsers;

if (document.getElementById("totalSales"))
    document.getElementById("totalSales").textContent = data.stats.totalSales;

if (document.getElementById("orders"))
    document.getElementById("orders").textContent = data.stats.orders;


// --------------- FILL USER TABLES ---------------
const rowHTML = (u) => `
<tr>
  <td>${u.name}</td>
  <td>${u.role}</td>
  <td>${u.sales}</td>
</tr>`;

function loadUsers(list, table) {
    table.innerHTML = "";
    list.forEach(u => table.insertAdjacentHTML("beforeend", rowHTML(u)));
}

const tableDashboard = document.getElementById("userTable");
const tableUsers = document.getElementById("userTablePage");

// Dashboard: show top 5 sorted users
if (tableDashboard) loadUsers(data.users.slice(0, 5), tableDashboard);

// Users page: show all users sorted
if (tableUsers) loadUsers(data.users, tableUsers);


// -------------------- SEARCH FUNCTION --------------------
function searchUsers() {
    const q = document.getElementById("searchInput").value.toLowerCase();

    const filtered = data.users.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );

    if (tableDashboard) loadUsers(filtered.slice(0, 5), tableDashboard);
    if (tableUsers) loadUsers(filtered, tableUsers);
}

window.searchUsers = searchUsers;



// -------------------- CHART (SMALL) --------------------
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("salesChart");

    if (canvas) {
        new Chart(canvas, {
            type: "bar",
            data: {
                labels: data.users.map(u => u.name),
                datasets: [{
                    label: "Sales",
                    data: data.users.map(u => u.sales),
                    backgroundColor: "rgba(0, 123, 255, 0.5)"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
});
