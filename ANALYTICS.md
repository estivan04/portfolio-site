# Analytics Events Reference

## 📊 All Tracked Events in Microsoft Clarity

### Navigation Events
| Event Name | Trigger | Data Sent |
|------------|---------|-----------|
| `navigation_click` | User clicks any nav link | `page: href value` |
| `scroll_to_top_clicked` | Scroll-to-top button clicked | None |

### Interaction Events
| Event Name | Trigger | Data Sent |
|------------|---------|-----------|
| `button_click_{label}` | Any CTA or submit button | Label from button text |
| `theme_toggle` | Dark/light mode switch | `theme: "light" or "dark"` |
| `social_click` | LinkedIn or GitHub link | `platform: "linkedin" or "github"` |
| `form_submission` | Contact form submitted | None |

### Engagement Events
| Event Name | Trigger | Data Sent |
|------------|---------|-----------|
| `scroll_25_percent` | User scrolls 25% of page | None |
| `scroll_50_percent` | User scrolls 50% of page | None |
| `scroll_75_percent` | User scrolls 75% of page | None |
| `scroll_100_percent` | User scrolls to bottom | None |

### Easter Egg Events
| Event Name | Trigger | Data Sent |
|------------|---------|-----------|
| `konami_code_activated` | ↑↑↓↓←→←→BA typed | None |
| `achievement_unlocked` | Any achievement earned | `achievement: achievement_id` |

### Performance Metrics (Custom Dimensions)
| Metric Name | Description | Target |
|-------------|-------------|--------|
| `lcp` | Largest Contentful Paint (ms) | < 2500 |
| `fid` | First Input Delay (ms) | < 100 |
| `cls` | Cumulative Layout Shift | < 0.1 |

---

## 🎮 Achievement IDs

| Achievement ID | Name | Unlock Condition |
|----------------|------|------------------|
| `explorer` | Explorer | Visit all 7 pages |
| `deepdive` | Deep Diver | Stay on Deep Dive 30s |
| `gamemaster` | Game Master | Unlock all achievements |
| `chat` | Conversationalist | Open chat widget |
| `darkmode` | Night Owl | Toggle dark theme |
| `konami` | Secret Discoverer | Konami code |
| `social` | Networker | Click social link |
| `contact` | Messenger | Submit form |

---

## 📈 Viewing Events in Clarity

1. Login to [Clarity Dashboard](https://clarity.microsoft.com/)
2. Select project: **Estivan Ayramia Portfolio**
3. Go to **Events** tab
4. Filter by event name
5. View heatmaps and session recordings

### Useful Filters:
- **High-value users**: Filter by users who unlocked achievements
- **Form abandonment**: Sessions with `button_click_explore_more` but no `form_submission`
- **Engaged users**: Sessions with scroll depth > 75%
- **Secret hunters**: Filter by `konami_code_activated` event

---

## 🔍 Custom Analysis Queries

### Find Power Users
Users who:
- Visited all pages (explorer achievement)
- Scrolled 100% on multiple pages
- Toggled theme
- Submitted form

### Identify Drop-off Points
Compare:
- `button_click_explore_more` count
- vs. `form_submission` count
- = Conversion rate

### Theme Preference
Count events:
- `theme_toggle` with `theme: "dark"`
- vs. `theme: "light"`

### Social Media Effectiveness
Compare:
- `social_click` with `platform: "linkedin"`
- vs. `platform: "github"`

---

## 🛠️ Adding New Events

To track a new action:

```javascript
// In site.js, add to relevant function:
if (typeof clarity === 'function') {
    clarity('event', 'your_event_name', { 
        optional_data: 'value' 
    });
}
```

Example - Track video plays:
```javascript
videoElement.addEventListener('play', () => {
    if (typeof clarity === 'function') {
        clarity('event', 'video_played', { 
            video: videoElement.src 
        });
    }
});
```

---

## 📊 Expected Event Volume

Based on typical portfolio traffic (500 visitors/month):

| Event | Est. Monthly Count | Notes |
|-------|-------------------|-------|
| `navigation_click` | 2000-3000 | ~4-6 per visitor |
| `scroll_50_percent` | 300-400 | ~60-80% of visitors |
| `button_click_explore_more` | 100-150 | ~20-30% CTR |
| `form_submission` | 10-20 | ~2-4% conversion |
| `theme_toggle` | 50-100 | ~10-20% try dark mode |
| `social_click` | 50-75 | ~10-15% check socials |
| `konami_code_activated` | 1-5 | Only for easter egg hunters! |
| `achievement_unlocked` | 200-400 | Active engagement |

---

## 🚨 Alert Thresholds

Set up Clarity alerts for:

### High Priority:
- **LCP > 3000ms**: Performance issue
- **Form submission drop**: Check Formspree
- **Zero events for 24h**: Tracking broken

### Medium Priority:
- **CLS > 0.15**: Layout shift issue
- **Scroll depth < 25%**: Content not engaging

### Nice to Know:
- **Konami code spike**: Easter egg discovered and shared!
- **Achievement unlock rate**: Gamification working

---

**Last Updated**: January 2025
**Tracking ID**: ubbdpwxnae
**Platform**: Microsoft Clarity
