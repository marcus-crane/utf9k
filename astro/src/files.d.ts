// Source: https://docs.astro.build/en/recipes/add-yaml-support/
// Specify the file extension you want to import
declare module "*.yml" {
    const value: any; // Add type definitions here if desired
    export default value;
}