"use client";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const shareToTwitter = () => {
    const shareUrl = encodeURIComponent(url);
    const text = encodeURIComponent(title);
    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const shareToFacebook = () => {
    const shareUrl = encodeURIComponent(url);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    // 可以添加 toast 提示
    alert("链接已复制到剪贴板");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">分享到：</span>
      <button
        onClick={shareToTwitter}
        className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="分享到 Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
      <button
        onClick={shareToFacebook}
        className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="分享到 Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>
      <button
        onClick={copyLink}
        className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="复制链接"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
}