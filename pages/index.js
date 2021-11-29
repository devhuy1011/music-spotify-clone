import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>This is may be a cool app spotify clone 🍎 </h1>
      <main>
      
        {/* SideBar */}
        {/* Center */}
      </main>
      <div>
        {/* Player */}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50', {
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
    },
  })
  const data = await res.json()
  return {
    props: {
      data: data.items,
    },
  }
}

export async function getStaticPaths() {
  const res = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50', {
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
    },
  })
  const data = await res.json()
  return {
    paths: data.items.map((item) => ({
      params: {
        id: item.id,
      },
    })),
    fallback: false,
  }
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${params.id}/top-tracks?country=US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
      },
    }
  )
  const data = await res.json()
  return {
    props: {
      data: data.tracks,
    },
  }
}
