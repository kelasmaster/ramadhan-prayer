// script.js

document.getElementById("generateBtn").addEventListener("click", async () => {
  const city = document.getElementById("city").value.trim();
  const year = document.getElementById("year").value.trim();
  const tableBody = document.querySelector("#prayerTable tbody");

  // Clear existing rows
  tableBody.innerHTML = "";

  if (!city || !year) {
    alert("Please enter both a city and a year.");
    return;
  }

  try {
    // Fetch latitude and longitude for the given city using Geocoding API
    const geocodeResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=0f0ac770b691491a9d32555d5840299e`);
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.results.length === 0) {
      alert("City not found. Please enter a valid city name.");
      return;
    }

    const { lat, lng } = geocodeData.results[0].geometry;

    // Fetch prayer times for the entire month of Ramadan
    const ramadanStart = getRamadanStartDate(year); // Helper function to calculate Ramadan start date
    const prayerTimes = [];

    for (let day = 1; day <= 30; day++) {
      const date = new Date(ramadanStart);
      date.setDate(date.getDate() + (day - 1));

      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const prayerResponse = await fetch(`https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${lat}&longitude=${lng}&method=5`);
      const prayerData = await prayerResponse.json();

      const timings = prayerData.data.timings;
      prayerTimes.push({
        day: day,
        fajr: timings.Fajr,
        dhuhr: timings.Dhuhr,
        asr: timings.Asr,
        maghrib: timings.Maghrib,
        isha: timings.Isha
      });
    }

    // Populate the table with prayer times
    prayerTimes.forEach(dayData => {
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

  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching prayer times. Please try again.");
  }
});

// Helper function to calculate the start date of Ramadan
function getRamadanStartDate(year) {
  // This is a simplified calculation. For precise dates, use a Hijri calendar API.
  const ramadanStartDates = {
    2023: "2023-03-23",
    2024: "2024-03-11",
    2025: "2025-03-01"
  };

  if (!ramadanStartDates[year]) {
    throw new Error("Ramadan start date not available for the selected year.");
  }

  return new Date(ramadanStartDates[year]);
}
