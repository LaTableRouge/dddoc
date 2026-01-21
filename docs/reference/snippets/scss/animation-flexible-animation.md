# Make a flexible animation class

## Create a keyframe with variables

```scss
@keyframes fadeFromBottom {
    from {
        transform: translateY(var(--baseTranslateY, 30px));
        opacity: var(--baseOpacity, 0);
    }

    to {
        transform: translateY(var(--destTranslateY, 0px));
        opacity: var(--destOpacity, 1);
    }
}
```

## Create an animation class

```scss
.anim-fadein {
    transform: translateY(var(--baseTranslateY, 30px));
    animation-name: fadeFromBottom;
    animation-duration: var(--animationDuration, 0.5s);
    animation-timing-function: var(--animationTiming, ease-in-out);
    animation-delay: var(--animationDelay, 0s);
    animation-iteration-count: 1;
    opacity: var(--baseOpacity, 0);
    animation-fill-mode: forwards;
}

.anim-fadein.fromBottom {
    // Variables start/end values of the animation
    --baseTranslateY: 20px;
    --baseOpacity: 0;
    --destTranslateY: 0;
    --destOpacity: 1;
}

.anim-fadein.fromTop {
    // Variables start/end values of the animation
    --baseTranslateY: -20px;
    --baseOpacity: 0.2;
    --destTranslateY: 0;
    --destOpacity: 1;

    --animationDuration: 0.8s;
}
```
