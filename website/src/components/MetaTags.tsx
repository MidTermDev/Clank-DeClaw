interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function MetaTags({
  title = "DeClaw - 1,000 Claw Machine Robots on Solana",
  description = "Try your luck at the claw machine. 1,000 unique robots, on-chain, open source.",
  image = "https://declaws.com/og-image.png",
  url = "https://declaws.com",
}: MetaTagsProps) {
  return (
    <>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@ClankDeClaw" />
    </>
  );
}
