import { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import __AsideSlider from "../js/__AsideSlider"
import { $C, $G, $URL } from "../service/Service"
import AvatarFlow from "./AvatarFlow"
import TooltipWrap from "./TooltipWrap"

export default function AsidePictureSlider() {
  const location = useLocation()
  const imgRef = useRef()

  useEffect(() => {
    let timerID
    if ($G.PAGE === 'LOGIN') {
      timerID = setInterval(() => __AsideSlider(imgRef), 5000)
    }
    return () => {
      timerID = null
    }
  }, [])

  // console.log('aside slider ...', $G.PAGE, $C[$G.PAGE])

  return (
    <aside className={$C[$G.PAGE].aside} ref={imgRef} >
      {
        $G.PAGE === 'LOGIN'
          ? <div className={$C[$G.PAGE].aside_img} ></div>
          : <>
              <AvatarFlow />
              <nav style={{display: "flex", flexFlow: "column nowrap", alignItems: "center"}}>
                <Link to={{ pathname: "/support", state: { background: location }}}>
                  <TooltipWrap tip="Write Your message for us...">
                      <img className="w-icon m-0_5rem" src='data:image/png;base64,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' alt='' />
                  </TooltipWrap>
                </Link>
                <Link to={{ pathname: "/settings", state: { background: location }}}>
                  <TooltipWrap tip="Configure Your profile settings...">
                      <img className="w-icon m-0_5rem" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAjCAYAAADSQImyAAAACXBIWXMAAC4jAAAuIwF4pT92AAAEQ0lEQVR4nOVZ228MURg/58zs1karu2hCNO5JQ1wbt7TaB4IHRCQlXiQSHngQBA9CNRUR8URcEgn+ABQheMPGPW5PQhsaFR6EVlVpd3d2Pr8zM1m7ujN7pg27+JLvXOZc5vc75/u+mTmjExGTwk1zNeN8C4ozkYdYIQpRD9JnyI+QEGflJV0mnOgwE2JLXsGpiL2wVcirgLmKON+qY+VXZYAneo30c95AeksE4CdYJVgLsN/VUdicajbNDdia0/lCpyIAvR4Lfsqu8M3ShCqtClFzoYOXIjHCfHYCfAWqlXIHBjttHfkE5lNsrMCu5xnIgOX/I8BjsXHINHbwYCs1NJi/AZMvUSbAk8kF8P5jrKhoknVh7942XNtOmtb029ApiBIBbhhzmaZdh9MEf17kY0DoHEisAIkrrmOF4MwwdqD/tH7gi2HscQoEnrl1UNsBTWtMgSd6gPQb6guhHCQOoO5KgMXjtehzyBfsDIT6VKRzXZsVp6m2UqI3rKlpPtXVJRGL74PAPOgU3tlZSuHwl6wjE4lXWIB29BvmF7sjD70aVQn0QostXby4lL9718NGjYpYLUQm6+6Os3A460AKhd7zjx/HstLSch+gncHUy0KhNrwhuHZRJXAduharOJyVlLyGJlAuc9puUXl5jyeOsrJuZC8V75UpHuClqBGIxfYg+iwC6BHQn0tN1AUn28YCAc/heH/Z1E8nNkHgGoLEVbcOSgRo0KC3vLd3DkjsR3UJk88BxqKw790UDDZ7jUUEmw9HPOELdroIsQEmOMzZxT6iFkbj8UksGFyJ1WjCiu/DyscBajx0KcJoBVbosutgw3gLJ+7CDgzpJ4VWFo32sLq6rI05CfBEYgZM5AYA2E6raX37mOZGvCWezDbe2r2vX8fDGcf5gm0NRoD49OmljHpuXTwJ8I6OISwSuZAC79qRH4WpPCZdf5IVR0lJO7J2Fcx9ZORIz2bvHYhE6gHOXjmiR0hvQkdDi6AfoGG0r4EGsDOneWNjZbb3I5jZcseJuef9iJ7DHC969lElwLu6hiJcbnIm/o5ItArm0JbRJxrVWW3tRICbBZ3O6uuloZ7N6GMYs+Er7j7y630NowY7eWfABFhx8bK0j50YItAZPH0NJkObrQbAyzz9/WjdrwTg+F+wAAlrl3KJnJ+oUxW8NwHOa9LK0gcWKMy3EGYk0s0IYbYFUWwKTGxyztHJZDP6v1C4T0rcCZjmJcRgad/FPua7nc0HJAlkLTlHZ4lwucSVgHz68fPnw6y6ugg2LDC5QK6DlAApgVyOtcucyzLhI6eNNTT4BjEQ8YxCTvz9rjzbHwYv5f/7Ji40+QcIEH1z4v3QfIPxITZWYJc78BRaI4/q5LljoR8vOmejFU71qdyBo6mHlhCn8LTdxQr5dFqICakasOskj0aIjjg/N1jq+LrQxf7Jcc5yYvmjAFtz72/8Q/MDJa90npdHzCIAAAAASUVORK5CYII=' alt='' />
                  </TooltipWrap>
                </Link>
              </nav>
            </>
      }
    </aside>
  )
}