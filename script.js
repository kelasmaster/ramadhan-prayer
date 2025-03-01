// script.js

// Placeholder prayer times for demonstration
const prayerTimesData = {
  2023: [
    { day: 1, fajr: "04:30", dhuhr: "12:15", asr: "15:45", maghrib: "18:30", isha: "19:45" },
    { day: 2, fajr: "04:31", dhuhr: "12:15", asr: "15:46", maghrib: "18:31", isha: "19:46" },
    // Add more days up to 30...
    { day: 30, fajr: "04:50", dhuhr: "12:15", asr: "15:55", maghrib: "18:50", isha: "20:05" }
  ]
};

document.getElementById("generateBtn").addEventListener("click", () => {
  const year = document.getElementById("year").value;
  const tableBody = document.querySelector("#prayerTable tbody");

  // Clear existing rows
  tableBody.innerHTML = "";

  // Check if data exists for the selected year
  if (prayerTimesData[year]) {
    prayerTimesData[year].forEach(dayData => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${dayData.day}</td>
        <td>${dayData.fajr}</td>
        <td>${dayData.dhuhr}</td>
        <td>${dayData.asr}</td>
        <td>${dayData.maghrib}</td>
        <td>${dayData.isha}</td>
      `;
      tableBody.appendChild(row);
    });
  } else {
    alert(`Prayer times for the year ${year} are not available.`);
  }
});
