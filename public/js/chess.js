// Fetch Chess.com stats
async function loadChessStats() {
    const container = document.getElementById('chess-stats');

    try {
        const response = await fetch('/api/chess');
        const data = await response.json();

        if (data.error) {
            container.innerHTML = `<div class="error">Error: ${data.error}</div>`;
            return;
        }

        let html = '<div class="retro-grid">';
        html += '<div class="icon-row">';
        html += '<div class="retro-icon">♔</div>';
        html += '<span class="retro-badge">Chess</span>';
        html += '<span class="retro-badge">Live Stats</span>';
        html += '<div class="geometric-accent"></div>';
        html += '</div>';
        html += '</div>';

        html += '<div class="stats-grid">';

        // Rapid Chess
        if (data.chess_rapid) {
            html += `
                <div class="stat-card">
                    <h3>⚡ Rapid</h3>
                    <div class="stat-row">
                        <span class="stat-label">Rating:</span>
                        <span class="stat-value">${data.chess_rapid.last.rating}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Best:</span>
                        <span class="stat-value">${data.chess_rapid.best?.rating || 'N/A'}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Win/Loss/Draw:</span>
                        <span class="stat-value">${data.chess_rapid.record.win}/${data.chess_rapid.record.loss}/${data.chess_rapid.record.draw}</span>
                    </div>
                </div>
            `;
        }

        // Blitz Chess
        if (data.chess_blitz) {
            html += `
                <div class="stat-card">
                    <h3>⚡⚡ Blitz</h3>
                    <div class="stat-row">
                        <span class="stat-label">Rating:</span>
                        <span class="stat-value">${data.chess_blitz.last.rating}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Best:</span>
                        <span class="stat-value">${data.chess_blitz.best?.rating || 'N/A'}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Win/Loss/Draw:</span>
                        <span class="stat-value">${data.chess_blitz.record.win}/${data.chess_blitz.record.loss}/${data.chess_blitz.record.draw}</span>
                    </div>
                </div>
            `;
        }

        // Bullet Chess
        if (data.chess_bullet) {
            html += `
                <div class="stat-card">
                    <h3>⚡⚡⚡ Bullet</h3>
                    <div class="stat-row">
                        <span class="stat-label">Rating:</span>
                        <span class="stat-value">${data.chess_bullet.last.rating}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Best:</span>
                        <span class="stat-value">${data.chess_bullet.best?.rating || 'N/A'}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Win/Loss/Draw:</span>
                        <span class="stat-value">${data.chess_bullet.record.win}/${data.chess_bullet.record.loss}/${data.chess_bullet.record.draw}</span>
                    </div>
                </div>
            `;
        }

        // Daily Chess
        if (data.chess_daily) {
            html += `
                <div class="stat-card">
                    <h3>📅 Daily</h3>
                    <div class="stat-row">
                        <span class="stat-label">Rating:</span>
                        <span class="stat-value">${data.chess_daily.last.rating}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Best:</span>
                        <span class="stat-value">${data.chess_daily.best?.rating || 'N/A'}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Win/Loss/Draw:</span>
                        <span class="stat-value">${data.chess_daily.record.win}/${data.chess_daily.record.loss}/${data.chess_daily.record.draw}</span>
                    </div>
                </div>
            `;
        }

        html += '</div>';
        container.innerHTML = html;

    } catch (error) {
        container.innerHTML = `<div class="error">Failed to load stats: ${error.message}</div>`;
    }
}

// Load stats when page loads
loadChessStats();
