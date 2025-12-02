// Fetch Dota 2 stats
async function loadDotaStats() {
    const container = document.getElementById('dota-stats');

    try {
        const response = await fetch('/api/dota');
        const data = await response.json();

        if (data.error) {
            container.innerHTML = `<div class="error">Error: ${data.error}</div>`;
            return;
        }

        let html = '<div class="retro-grid">';
        html += '<div class="icon-row">';
        html += '<div class="retro-icon">⚔️</div>';
        html += '<span class="retro-badge">Dota 2</span>';
        html += '<span class="retro-badge">Player Stats</span>';
        html += '<div class="geometric-accent"></div>';
        html += '</div>';
        html += '</div>';

        // Player Profile
        if (data.profile) {
            html += `
                <div class="output">
                    <p>> Player: ${data.profile.personaname || 'Unknown'}</p>
                    ${data.profile.profileurl ? `<p>> Profile: <a href="${data.profile.profileurl}" target="_blank">${data.profile.profileurl}</a></p>` : ''}
                </div>
            `;
        }

        html += '<div class="stats-grid">';

        // Rank Info
        if (data.rank_tier || data.leaderboard_rank) {
            const rankNames = ['Unranked', 'Herald', 'Guardian', 'Crusader', 'Archon', 'Legend', 'Ancient', 'Divine', 'Immortal'];
            const rankTier = data.rank_tier || 0;
            const medal = Math.floor(rankTier / 10);
            const stars = rankTier % 10;
            const rankName = rankNames[medal] || 'Unknown';

            html += `
                <div class="stat-card">
                    <h3>🏅 Rank</h3>
                    <div class="stat-row">
                        <span class="stat-label">Medal:</span>
                        <span class="stat-value">${rankName} ${stars > 0 ? '[' + '★'.repeat(stars) + ']' : ''}</span>
                    </div>
                    ${data.leaderboard_rank ? `
                    <div class="stat-row">
                        <span class="stat-label">Leaderboard:</span>
                        <span class="stat-value">#${data.leaderboard_rank}</span>
                    </div>
                    ` : ''}
                </div>
            `;
        }

        // Win/Loss Stats
        if (data.win_loss) {
            const total = data.win_loss.win + data.win_loss.lose;
            const winRate = total > 0 ? ((data.win_loss.win / total) * 100).toFixed(1) : 0;
            html += `
                <div class="stat-card">
                    <h3>📊 Win/Loss</h3>
                    <div class="stat-row">
                        <span class="stat-label">Wins:</span>
                        <span class="stat-value">${data.win_loss.win}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Losses:</span>
                        <span class="stat-value">${data.win_loss.lose}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Win Rate:</span>
                        <span class="stat-value">${winRate}%</span>
                    </div>
                </div>
            `;
        }

        // MMR Estimate
        if (data.mmr_estimate) {
            html += `
                <div class="stat-card">
                    <h3>🏆 MMR Estimate</h3>
                    <div class="stat-row">
                        <span class="stat-label">Estimate:</span>
                        <span class="stat-value">${data.mmr_estimate.estimate || 'N/A'}</span>
                    </div>
                </div>
            `;
        }

        html += '</div>';

        // Recent Matches
        if (data.recent_matches && data.recent_matches.length > 0) {
            html += `
                <div class="output">
                    <p class="prompt"><span class="user">user@shubh</span>:<span class="path">~/dota</span>$ cat recent_matches.log</p>
                </div>
                <div class="stat-card">
                    <h3>⚔️ Recent Matches (Last 5)</h3>
            `;

            data.recent_matches.slice(0, 5).forEach((match, index) => {
                const result = match.player_slot < 128 ?
                    (match.radiant_win ? 'WIN' : 'LOSS') :
                    (!match.radiant_win ? 'WIN' : 'LOSS');
                const resultColor = result === 'WIN' ? 'var(--green-bright)' : '#ff4444';

                html += `
                    <div class="stat-row">
                        <span class="stat-label">Match ${index + 1}:</span>
                        <span class="stat-value" style="color: ${resultColor}">
                            ${result} | K:${match.kills} D:${match.deaths} A:${match.assists}
                        </span>
                    </div>
                `;
            });

            html += '</div>';
        }

        container.innerHTML = html;

    } catch (error) {
        container.innerHTML = `<div class="error">Failed to load stats: ${error.message}</div>`;
    }
}

// Load stats when page loads
loadDotaStats();
