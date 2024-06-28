import chalk from 'chalk';
import { get_matching_refs } from './refs.js';
 * @param git_context {{ fs, dir, gitdir, cache }} as taken by most isomorphic-git methods.
export const format_commit_oid = async (git_context, oid, { short_hashes = false } = {}) => {
    const hash = short_hashes ? await shorten_hash(git_context, oid) : oid;

    const refs = await get_matching_refs(git_context, oid);
    if (refs.length === 0)
        return hash;

    let s = `${hash} (`;
    s += refs.map(ref => {
        // Different kinds of ref are styled differently, but all are in bold:
        // HEAD and local branches are cyan
        if (ref === 'HEAD') {
            // TODO: If HEAD points to another ref, that should be shown here as `HEAD -> other`
            return chalk.bold.cyan(ref);
        }
        if (ref.startsWith('refs/heads/'))
            return chalk.bold.cyanBright(ref.slice('refs/heads/'.length));
        // Tags are `tag: foo` in yellow
        if (ref.startsWith('refs/tags/'))
            return chalk.bold.yellowBright(`tag: ${ref.slice('refs/tags/'.length)}`);
        // Remote branches are red
        if (ref.startsWith('refs/remotes/'))
            return chalk.bold.red(ref.slice('refs/remotes/'.length));
        // Assuming there's anything else, we'll just bold it.
        return chalk.bold(ref);
    }).join(', ');
    s += ')';

    return s;
 * @param git_context {{ fs, dir, gitdir, cache }} as taken by most isomorphic-git methods.
export const format_commit = async (git_context, commit, oid, options = {}) => {
    const indent = (text) => text.split('\n').map(it => `    ${it}`).join('\n');
            return `${chalk.yellow(await format_commit_oid(git_context, oid, options))} ${title_line()}`;
            s += chalk.yellow(`commit ${await format_commit_oid(git_context, oid, options)}\n`);
            s += indent(title_line());
            s += chalk.yellow(`commit ${await format_commit_oid(git_context, oid, options)}\n`);
            s += indent(commit.message);
            s += chalk.yellow(`commit ${await format_commit_oid(git_context, oid, options)}\n`);
            s += indent(commit.message);
            s += chalk.yellow(`commit ${await format_commit_oid(git_context, oid, options)}\n`);
            s += indent(commit.message);
            s += chalk.yellow(`commit ${await format_commit_oid(git_context, oid, options)}\n`);
            s += indent(commit.message);
    s += chalk.yellow(`tree ${oid}\n`);
    s += chalk.yellow(`tag ${tag.tag}\n`);
 * @param git_context {{ fs, dir, gitdir, cache }} as taken by most isomorphic-git methods.
export const format_diffs = async (git_context, diffs, options) => {
            const short_a_oid = await shorten_hash(git_context, a.oid);
            const short_b_oid = await shorten_hash(git_context, b.oid);

            s += `:${a.mode} ${b.mode} ${short_a_oid} ${short_b_oid} `;
            const short_a_oid = await shorten_hash(git_context, a.oid);
            const short_b_oid = await shorten_hash(git_context, b.oid);

            s += chalk.bold(`diff --git ${first_line_a_path} ${b_path}\n`);
                s += chalk.bold(`index ${short_a_oid}..${short_b_oid} ${a.mode}\n`);
                    s += chalk.bold(`new file mode ${b.mode}\n`);
                    s += chalk.bold(`old mode ${a.mode}\n`);
                    s += chalk.bold(`new mode ${b.mode}\n`);
                s += chalk.bold(`index ${short_a_oid}..${short_b_oid}\n`);
            s += chalk.bold(`--- ${a_path}\n`);
            s += chalk.bold(`+++ ${b_path}\n`);
                s += chalk.blueBright(`@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@\n`);
                            s += chalk.greenBright(`${line}\n`);
                            s += chalk.redBright(`${line}\n`);