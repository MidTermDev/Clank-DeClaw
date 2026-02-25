"use client";

interface ShareButtonsProps {
  nftId: number;
}

export default function ShareButtons({ nftId }: ShareButtonsProps) {
  const url = `https://declaws.com/declaw/${nftId}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      alert("Link copied!");
    }
  };

  return (
    <div className="flex gap-3">
      <a
        href={`https://twitter.com/intent/tweet?text=Check out DeClaw %23${nftId} 🤖&url=${encodeURIComponent(url)}&via=ClankDeClaw`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 rounded-xl bg-black p-3 text-center text-sm font-medium text-white hover:bg-gray-800 transition-colors"
      >
        Share on X
      </a>
      <button
        onClick={copyLink}
        className="flex-1 rounded-xl bg-gray-100 p-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
      >
        Copy Link
      </button>
    </div>
  );
}
