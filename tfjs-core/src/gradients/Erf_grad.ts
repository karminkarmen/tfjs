/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {Erf} from '../kernel_names';
import {GradConfig} from '../kernel_registry';
import {exp} from '../ops/exp';
import {mul} from '../ops/mul';
import {neg} from '../ops/neg';
import {square} from '../ops/square';
import {Tensor} from '../tensor';

export const erfGradConfig: GradConfig = {
  kernelName: Erf,
  inputsToSave: ['x'],
  gradFunc: (dy: Tensor, saved: Tensor[]) => {
    const [x] = saved;
    const a = mul(exp(neg(square(x))), 2 / Math.sqrt(Math.PI));
    return {x: () => mul(dy, a)};
  }
};
