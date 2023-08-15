import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async products(): Promise<any> {
    return this.prisma.product.aggregateRaw({
      pipeline: [
        {
          $sort: {
            rating: -1,
          },
        },
        {
          $limit: 10,
        },
      ],
    });
  }

  async getLatestProducts(): Promise<any> {
    return this.prisma.product.aggregateRaw({
      pipeline: [
        {
          $sort: {
            creationDate: -1,
          },
        },
      ],
    });
  }

  async product(id: string): Promise<Product> {
    return this.prisma.product.findFirst({
      where: {
        link: id,
      },
    });
  }

  async searchProducts(body: any): Promise<any> {
    return this.prisma.product.aggregateRaw({
      pipeline: [
        {
          $match: {
            name: {
              $regex: body.keyword,
              $options: 'i',
            },
          },
        },
        {
          $limit: 5,
        },
      ],
    } as any);
  }

  async createProduct(body: any): Promise<any> {
    if (
      !body.name ||
      !body.description ||
      !body.price ||
      !body.rating ||
      !body.image ||
      !body.stock
    ) {
      throw new BadRequestException('Missing Body elements');
    }

    function nameToURLPath(name) {
      let out = '';
      for (let i = 0; name.length > i; i++) {
        if (name[i].match(/[a-zA-Z0-9]/g)) {
          out += name[i].toLowerCase();
        } else if (name[i] == ' ') {
          out += '-';
        }
      }

      return out;
    }

    function makeid(length) {
      let result = '';
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
        counter += 1;
      }
      return result;
    }
    let datee: any = new Date();

    datee = datee.toISOString();
    return this.prisma.product.create({
      data: {
        link: `${nameToURLPath(body.name)}-${makeid(10)}`,
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        rating: parseFloat(body.rating),
        image: body.image,
        stock: parseFloat(body.stock),
        creationDate: datee,
      },
    });
  }
}
