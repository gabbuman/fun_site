// Fetch Solar data
async function loadSolarData() {
    const container = document.getElementById('solar-data');

    try {
        const response = await fetch('/api/solar');
        const data = await response.json();

        if (data.error) {
            container.innerHTML = `<div class="error">Error: ${data.error}</div>`;
            return;
        }

        let html = '<div class="retro-grid">';
        html += '<div class="icon-row">';
        html += '<div class="sun-icon"></div>';
        html += '<span class="retro-badge">Solar Power</span>';
        html += '<span class="retro-badge">Live Data</span>';
        html += '<div class="geometric-accent"></div>';
        html += '</div>';
        html += '</div>';

        html += '<div class="stats-grid">';

        // Display data for each region
        if (data.regions) {
            data.regions.forEach(region => {
                const current = region.current || {};
                const daily = region.daily || {};

                // Format time if available
                const localTime = region.current_time ? new Date(region.current_time).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                }) : 'N/A';

                html += `
                    <div class="stat-card">
                        <h3>☀️ ${region.name}</h3>
                        <div class="stat-row">
                            <span class="stat-label">Location:</span>
                            <span class="stat-value">${region.location}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Local Time:</span>
                            <span class="stat-value">${localTime}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Timezone:</span>
                            <span class="stat-value">${region.timezone || 'N/A'}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Current GHI:</span>
                            <span class="stat-value">${current.ghi || 'N/A'} W/m²</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Direct Normal:</span>
                            <span class="stat-value">${current.dni || 'N/A'} W/m²</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Diffuse:</span>
                            <span class="stat-value">${current.dhi || 'N/A'} W/m²</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Peak Today:</span>
                            <span class="stat-value">${daily.peak || 'N/A'} W/m²</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Sunshine Hrs:</span>
                            <span class="stat-value">${daily.sunshine_duration ? (daily.sunshine_duration / 3600).toFixed(1) + 'h' : 'N/A'}</span>
                        </div>
                    </div>
                `;
            });
        }

        html += '</div>';

        // Add information section
        html += `
            <div class="output" style="margin-top: 30px;">
                <p class="prompt"><span class="user">user@shubh</span>:<span class="path">~/solar</span>$ cat README.md</p>
                <div class="stat-card" style="margin-top: 10px;">
                    <h3>📚 Solar Terms</h3>
                    <div class="stat-row">
                        <span class="stat-label">GHI:</span>
                        <span class="stat-value" style="font-size: 12px;">Global Horizontal Irradiance (total solar radiation on horizontal surface)</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">DNI:</span>
                        <span class="stat-value" style="font-size: 12px;">Direct Normal Irradiance (direct beam solar radiation)</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">DHI:</span>
                        <span class="stat-value" style="font-size: 12px;">Diffuse Horizontal Irradiance (scattered solar radiation)</span>
                    </div>
                </div>
                <p style="margin-top: 15px; color: var(--text-dim);">
                    > Data refreshes every hour<br>
                    > Powered by Open-Meteo Solar API<br>
                    > 1000 W/m² is considered "full sun" for solar panel ratings
                </p>
            </div>
        `;

        container.innerHTML = html;

    } catch (error) {
        container.innerHTML = `<div class="error">Failed to load solar data: ${error.message}</div>`;
    }
}

// Load data when page loads
loadSolarData();
