import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";

const pluginKey = import.meta.env.VITE_CHANNEL_PLUGIN_KEY;

const VISIBLE_PATHS = ["/", "/mypage"];

export default function ChannelTalk() {
  const location = useLocation();

  useEffect(() => {
    if (!pluginKey) {
      console.warn("VITE_CHANNEL_PLUGIN_KEY is not set.");
      return;
    }

    ChannelService.loadScript();
    ChannelService.boot({
      pluginKey,
      language: "ko",
    });

    return () => {
      ChannelService.shutdown();
    };
  }, []);

  useEffect(() => {
    if (!pluginKey) return;

    ChannelService.setPage(`${location.pathname}${location.search}`);

    if (VISIBLE_PATHS.includes(location.pathname)) {
      ChannelService.showChannelButton();
    } else {
      ChannelService.hideChannelButton();
    }
  }, [location.pathname, location.search]);

  return null;
}
