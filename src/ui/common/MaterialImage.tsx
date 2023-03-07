import {createSvgIcon} from "@mui/material/utils";
import {styled} from "@mui/material/styles";
import {useState} from "react";
import {Box, CircularProgress, circularProgressClasses} from "@mui/material";

const BrokenImageIcon = createSvgIcon(
    <path d="M21 5v6.59l-2.29-2.3c-.39-.39-1.03-.39-1.42 0L14 12.59 10.71 9.3a.9959.9959 0 0 0-1.41 0L6 12.59 3 9.58V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42 3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l2.29 2.29c.39.39 1.02.39 1.41 0l3.3-3.3 3.29 3.29c.39.39 1.02.39 1.41 0l3.3-3.28z" />,
    'BrokenImageIcon'
);

const Img = styled('img')({
    '@keyframes materialize': {
        '0%': {
            filter: 'saturate(20%) contrast(50%) brightness(120%)',
        },
        '75%': {
            filter: 'saturate(60%) contrast(100%) brightness(100%)',
        },
        '100%': {
            filter: 'saturate(100%) contrast(100%) brightness(100%)',
        },
    },
});

export interface MaterialImageProps{
    alt?: string;
    bgColor?: string;
    className?: string;
    distance?: string | number;
    duration?: number;
    easing?: string;
    errorIcon?: boolean | React.ReactNode;
    fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' | 'inherit' | 'initial' | 'revert' | 'unset';
    height?: string | number;
    iconWrapperClassName?: string;
    iconWrapperStyle?: any;
    position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky' | 'inherit' | 'initial' | 'revert' | 'unset';
    shift?: 'left' | 'right' | 'top' | 'bottom' | false | null;
    shiftDuration?: number;
    showLoading?: boolean | React.ReactNode;
    src: string;
    style?: any;
    width?: string | number;
    wrapperClassName?: string;
    wrapperStyle?: any;
}

function SpinningLoader() {
    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant="determinate"
                sx={{ color: "#FFFFFF",}}
                size={40}
                thickness={4}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: '#00FFB3',
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={40}
                thickness={4}
            />
        </Box>
    );
}

// Taken from https://github.com/benmneb/mui-image
export const MaterialImage: React.FC<MaterialImageProps> = (props) => {
    const {src, alt, height, width, position, fit, style, className, showLoading, errorIcon, shift, distance, shiftDuration, bgColor, wrapperStyle, iconWrapperStyle, wrapperClassName,
        iconWrapperClassName, duration, easing,
        ...rest
    } = props;

    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    function handleLoad() {
        setLoaded(true);
        setError(false);
    }

    function handleError() {
        setError(true);
        setLoaded(false);
    }


    const styles = {
        root: {

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: bgColor,
            ...wrapperStyle,
        },
        image: {
            position,
            width,
            height,
            objectFit: fit,
            transitionProperty: `${Boolean(shift) ? `${shift}, ` : ''}opacity`,
            transitionDuration: `${Boolean(shift) ? `${shiftDuration || duration!! * 0.3}ms, ` : ''}${duration!! / 2}ms`,
            transitionTimingFunction: easing,
            opacity: loaded ? 1 : 0,
            animation: loaded ? `materialize ${duration}ms 1 ${easing}` : '',
            ...style,
        },
        error: {
            position: 'relative',
            width,
            height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: loaded ? 0 : 1,
            ...iconWrapperStyle,
        },
        loading: {
            position: 'absolute',
            width,
            height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: loaded ? 0 : 1,
            ...iconWrapperStyle,
        },
    };

    const showErrorIcon = (typeof errorIcon !== 'boolean' && errorIcon) || (
        <BrokenImageIcon style={{ fontSize: 56, color: '#bdbdbd' }} /> // MUI grey[400]
    );

    const loadingIndicator = (typeof showLoading !== 'boolean' &&
        showLoading) || <SpinningLoader />


    return (
        <div
            style={styles.root}
            className={`mui-image-wrapper ${wrapperClassName}`}
        >
            {!error && <Img
                src={src}
                alt={alt}
                style={styles.image}
                className={`mui-image-img ${className}`}
                onLoad={handleLoad}
                onError={handleError}
                {...rest}
            />
            }
            {((Boolean(showLoading) && !error && !loaded)) && (
                <div
                    style={styles.loading}
                    className={`mui-image-iconWrapper ${iconWrapperClassName}`}
                >
                    {Boolean(showLoading) && !error && !loaded && loadingIndicator}
                </div>
            )}

            {((Boolean(errorIcon) && error)) && (
                <div
                    style={styles.error}
                    className={`mui-image-iconWrapper ${iconWrapperClassName}`}
                >
                    {Boolean(errorIcon) && error && showErrorIcon}
                </div>
            )}
        </div>
    );
}

MaterialImage.defaultProps = {
    alt: '',
    height: '100%',
    width: '100%',
    position: 'relative',
    fit: 'contain',
    showLoading: false,
    errorIcon: true,
    shift: false,
    distance: 100,
    shiftDuration: 0,
    bgColor: 'inherit',
    duration: 1000,
    easing: 'cubic-bezier(0.7, 0, 0.6, 1)', // "heavy move" from https://sprawledoctopus.com/easing/
    className: '',
    wrapperClassName: '',
    iconWrapperClassName: '',
};