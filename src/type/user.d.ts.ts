export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface IClerkUser { id: string, fullName: string | null, imageUrl: string, email: string }
}
