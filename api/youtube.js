export default async function handler(req, res) {
  try {
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600");
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const HANDLE = "shubhamspeaks03"; // without @

    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&forHandle=@${HANDLE}&key=${API_KEY}`
    );

    const channelData = await channelRes.json();
    const channel = channelData.items?.[0];

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;

    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=6&playlistId=${uploadsPlaylistId}&key=${API_KEY}`
    );

    const videosData = await videosRes.json();

    const videoIds = (videosData.items || [])
      .map((v) => v.snippet?.resourceId?.videoId)
      .filter(Boolean)
      .join(",");

    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${API_KEY}`
    );

    const statsData = await statsRes.json();

    const recentVideos = (statsData.items || []).map((v) => ({
      id: v.id,
      title: v.snippet.title,
      thumbnail:
        v.snippet.thumbnails?.medium?.url ||
        v.snippet.thumbnails?.default?.url,
      views: v.statistics.viewCount,
      url: `https://www.youtube.com/watch?v=${v.id}`,
    }));

    return res.status(200).json({
      channel: {
        title: channel.snippet.title,
        subscribers: channel.statistics.subscriberCount,
        totalViews: channel.statistics.viewCount,
        totalVideos: channel.statistics.videoCount,
      },
      recentVideos,
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
}
