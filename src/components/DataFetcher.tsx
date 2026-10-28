import { useEffect, useState } from 'react'
import axios from 'axios'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

function DataFetcher() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchPosts() {
      try {
        const response = await axios.get<Post[]>(
          'https://jsonplaceholder.typicode.com/posts?_limit=6',
          { signal: controller.signal },
        )
        setPosts(response.data)
      } catch (requestError) {
        if (!axios.isCancel(requestError)) {
          setError('Не вдалося завантажити публікації. Спробуйте оновити сторінку.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void fetchPosts()

    return () => controller.abort()
  }, [])

  return (
    <section className="data-section" aria-labelledby="page-title">
      <p className="eyebrow">Демонстрація роботи з API</p>
      <h1 id="page-title">Дані з мережі.<br />Одразу в React.</h1>
      <p className="section-intro">
        Приклад завантаження та відображення публікацій із сервера у React-компоненті.
      </p>

      <h2 className="posts-heading">
        Публікації {!loading && !error && <span className="post-count">{posts.length}</span>}
      </h2>

      {loading && (
        <div className="request-message" role="status" aria-live="polite">
          <span className="loader" aria-hidden="true" />
          Завантаження даних із сервера...
        </div>
      )}

      {error && <div className="request-message error" role="alert">{error}</div>}

      {!loading && !error && (
        <div className="posts-grid">
          {posts.map((post) => (
            <article className="post-card" key={post.id}>
              <p className="post-number">POST {String(post.id).padStart(2, '0')}</p>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </article>
          ))}
        </div>
      )}

      <section className="implementation" aria-labelledby="implementation-title">
        <div className="implementation-heading">
          <p className="eyebrow">Всередині проєкту</p>
          <h2 id="implementation-title">Що тут реалізовано</h2>
          <p>Повний цикл запиту: від отримання даних до відображення результату та обробки помилок.</p>
        </div>

        <div className="implementation-grid">
          <article className="implementation-card">
            <span className="implementation-index">01</span>
            <h3>Запит до API</h3>
            <p>Axios надсилає GET-запит до JSONPlaceholder і отримує шість публікацій.</p>
            <span className="tech-tag">axios.get()</span>
          </article>
          <article className="implementation-card">
            <span className="implementation-index">02</span>
            <h3>Завантаження при старті</h3>
            <p>useEffect запускає асинхронну функцію після першого рендеру компонента.</p>
            <span className="tech-tag">useEffect · async/await</span>
          </article>
          <article className="implementation-card">
            <span className="implementation-index">03</span>
            <h3>Стани та типи</h3>
            <p>TypeScript описує структуру публікації; useState зберігає дані, завантаження й помилку.</p>
            <span className="tech-tag">Post · useState</span>
          </article>
          <article className="implementation-card">
            <span className="implementation-index">04</span>
            <h3>Відображення результату</h3>
            <p>Показуємо індикатор завантаження, картки з постами або зрозуміле повідомлення про помилку.</p>
            <span className="tech-tag">Loading · Success · Error</span>
          </article>
        </div>

        <p className="api-source">
          Джерело даних: <a href="https://jsonplaceholder.typicode.com/posts?_limit=6" target="_blank" rel="noreferrer">JSONPlaceholder API ↗</a>
        </p>
      </section>
    </section>
  )
}

export default DataFetcher
