# Demo Guide

This guide provides step-by-step instructions for testing and demonstrating the Sonic Mixologist application.

## Quick Start Demo

### Prerequisites
- Node.js 18+ installed
- Spotify Developer Account (for full functionality)
- Git repository cloned locally

### Setup Steps

1. **Clone and Install**
```bash
git clone <repository-url>
cd sonic-mixologist

# Backend setup
cd server
npm install
cp .env.example .env
# Add your Spotify credentials to .env

# Frontend setup
cd ../client
npm install
cp .env.example .env
# Set VITE_API_URL=http://localhost:3001/api
```

2. **Start Services**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

3. **Access Application**
- Frontend: http://localhost:5173
- Backend Health: http://localhost:3001/health

## Demo Scenarios

### Scenario 1: Basic Search (No Spotify)

**Purpose**: Test fallback functionality without Spotify API

**Steps**:
1. Open browser to http://localhost:5173
2. Complete age verification (click "Yes, I am 21 or older")
3. Enter any song name (e.g., "Test Song")
4. Click Search

**Expected Results**:
- Shows loading animation
- Displays results page with default audio features
- Shows "Bartender's Choice" cocktail
- Displays confidence score around 50%

### Scenario 2: Spotify Integration

**Purpose**: Test full Spotify API integration

**Prerequisites**: Valid Spotify credentials in .env

**Steps**:
1. Search for popular songs:
   - "Flowers Miley Cyrus"
   - "Anti-Hero Taylor Swift"
   - "Bohemian Rhapsody Queen"

**Expected Results**:
- Real audio features from Spotify
- Accurate mood cluster assignment
- Relevant cocktail recommendations
- Higher confidence scores (70%+)

### Scenario 3: Different Music Genres

**Purpose**: Test translation across various music types

**Test Songs**:
1. **Rock**: "Highway to Hell - AC/DC"
   - Expected: Bold & Bitter → Old Fashioned/Negroni

2. **Pop**: "Uptown Funk - Bruno Mars"
   - Expected: Fruity & Tropical → Mai Tai

3. **Acoustic**: "Fast Car - Tracy Chapman"
   - Expected: Sweet & Light → Mojito

4. **Electronic**: "Strobe - Deadmau5"
   - Expected: Effervescent & Refreshing → French 75

### Scenario 4: Filter Options

**Purpose**: Test filtering and mocktail features

**Steps**:
1. Search for any song
2. On results page, click "Filters"
3. Enable "Mocktail Mode"
4. Add ingredient exclusions (e.g., "Tequila")
5. Click "Regenerate"

**Expected Results**:
- Shows non-alcoholic options
- Excludes specified ingredients
- Updates cocktail recommendation

### Scenario 5: Error Handling

**Purpose**: Test graceful degradation

**Test Cases**:
1. **Invalid Song**: Search for "asdfghjkl"
2. **Network Error**: Disconnect internet during search
3. **API Timeout**: Use very slow network

**Expected Results**:
- User-friendly error messages
- Fallback to default recommendations
- No application crashes

## Performance Testing

### Load Testing

**Tools**: Use browser dev tools or load testing tools

**Metrics to Monitor**:
- API response time (< 600ms target)
- Frontend rendering time
- Memory usage
- Cache hit rates

**Test Script**:
```javascript
// Browser console test
const testSong = "Flowers Miley Cyrus";
const startTime = performance.now();

fetch(`/api/recommend?query=${encodeURIComponent(testSong)}`)
  .then(response => response.json())
  .then(data => {
    const endTime = performance.now();
    console.log(`Response time: ${endTime - startTime}ms`);
    console.log('Result:', data);
  });
```

### Cache Testing

**Steps**:
1. Search for a song
2. Search for the same song again
3. Check for "Cached Result" indicator

**Expected Results**:
- First search: slower response
- Second search: faster response with cache indicator

## Mobile Testing

### Responsive Design

**Devices to Test**:
- iPhone 12/13/14
- Samsung Galaxy S21
- iPad
- Various Android devices

**Test Areas**:
- Age gate functionality
- Search bar usability
- Results display
- Filter panel
- Navigation menu

### Touch Interactions

**Test Actions**:
- Tap search button
- Swipe through results
- Use voice search (if supported)
- Share functionality

## Accessibility Testing

### Screen Reader

**Tools**: VoiceOver (iOS), TalkBack (Android), NVDA (Windows)

**Test Elements**:
- All buttons have labels
- Form fields properly announced
- Image alt text present
- Keyboard navigation works

### Keyboard Navigation

**Test Steps**:
1. Tab through all interactive elements
2. Use Enter/Space to activate
3. Test Escape key functionality
4. Verify focus indicators

## API Testing

### Manual API Testing

**Endpoints to Test**:

1. **Health Check**
```bash
curl http://localhost:3001/health
```

2. **Song Features**
```bash
curl "http://localhost:3001/api/song?query=Flowers%20Miley%20Cyrus"
```

3. **Recommendation**
```bash
curl "http://localhost:3001/api/recommend?query=Flowers%20Miley%20Cyrus"
```

### Expected Response Format

```json
{
  "song": "Flowers",
  "artist": "Miley Cyrus",
  "album": "Endless Summer Vacation",
  "audioFeatures": {
    "energy": 0.651,
    "valence": 0.576,
    "tempo": 125.052,
    "acousticness": 0.321
  },
  "moodCluster": "Fruity & Tropical",
  "confidence": 0.78,
  "drink": "Mai Tai",
  "ingredients": ["Light rum", "Dark rum", "Orange curaçao", "Orgeat syrup", "Lime juice"],
  "measurements": ["1 oz", "1 oz", "0.5 oz", "0.5 oz", "0.75 oz"],
  "instructions": "Shake with ice and strain into glass...",
  "image": "https://www.thecocktaildb.com/images/media/drink/twyrrp1468927316.jpg",
  "isAlcoholic": true,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Demo Script for Presentations

### 5-Minute Demo

1. **Introduction** (30s)
   - Explain the concept: music to cocktails
   - Show the landing page

2. **Basic Search** (1min)
   - Search for popular song
   - Show results and audio analysis

3. **Different Genres** (2min)
   - Show 2-3 different songs
   - Highlight different mood clusters
   - Explain translation logic

4. **Features** (1min)
   - Show filtering options
   - Demonstrate share functionality
   - Show recent searches

5. **Conclusion** (30s)
   - Recap key features
   - Mention tech stack
   - Q&A

### Technical Deep Dive (15min)

1. **Architecture Overview** (2min)
   - Show system diagram
   - Explain API flow

2. **Translation Engine** (5min)
   - Explain audio features
   - Show mood cluster mapping
   - Demonstrate scoring algorithm

3. **API Integration** (3min)
   - Show Spotify API usage
   - Demonstrate TheCocktailDB integration
   - Explain caching strategy

4. **Frontend Features** (3min)
   - Show React components
   - Explain state management
   - Demonstrate responsive design

5. **Deployment & Scaling** (2min)
   - Show deployment setup
   - Explain performance considerations
   - Discuss future enhancements

## Troubleshooting Common Demo Issues

### Spotify API Issues

**Problem**: "Authentication failed" errors
**Solution**: 
- Verify client ID and secret
- Check redirect URI matches Spotify dashboard
- Ensure server is accessible from Spotify

### CORS Issues

**Problem**: "CORS policy" errors
**Solution**:
- Check CORS_ORIGIN in backend .env
- Verify frontend URL matches
- Restart backend after changes

### Build Issues

**Problem**: Frontend build fails
**Solution**:
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all dependencies installed

### Performance Issues

**Problem**: Slow loading times
**Solution**:
- Check API response times
- Verify caching is working
- Consider optimizing images

## Success Metrics

### Demo Success Indicators

- **Engagement**: Users complete full search flow
- **Accuracy**: Recommendations make intuitive sense
- **Performance**: Response times under 600ms
- **Usability**: No user confusion or errors

### Analytics to Track

- Search completion rate
- Average session duration
- Feature usage (filters, sharing)
- Error rates and types
- Mobile vs desktop usage

This demo guide ensures comprehensive testing and impressive demonstrations of the Sonic Mixologist application's capabilities.
