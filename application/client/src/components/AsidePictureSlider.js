import { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { $C, $G } from "../service/Service"
import __AsideSlider from "../js/__AsideSlider"
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
    return () => clearInterval(timerID)
  }, [])

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