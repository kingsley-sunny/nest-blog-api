import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins';
import { ReadonlyVisitor } from '@nestjs/swagger/dist/plugin';

const generator = new PluginMetadataGenerator();
generator.generate({
  visitors: [
    new ReadonlyVisitor({
      introspectComments: true,
      pathToSource: __dirname,
      dtoFileNameSuffix: ['dto.ts', '.entity.ts', '.model.ts'],
    }),
  ],
  outputDir: __dirname,
  watch: true,
  tsconfigPath: 'tsconfig.build.json',
});
