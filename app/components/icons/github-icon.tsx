/* eslint-disable @next/next/no-img-element */
import githubIcon from '../../../public/github-mark.png';

export function GithubIcon() {
    return(
        <img src={githubIcon.src} alt="GitHub icon" width={18} height={18} />
    );
}

export default GithubIcon;